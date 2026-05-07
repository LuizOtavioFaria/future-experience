import { useRef, useState, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Stars, OrbitControls, Points, PointMaterial } from "@react-three/drei";
import * as THREE from "three";
import s from "./ProjectPage.module.css";

// ─── Config ──────────────────────────────────────────────────────────────────
const PHRASES = ["SYSTEM START", "CORE GEOMETRY", "DATA STREAM", "WIRE FRAME", "ACTIVE CORE"];
const BG_COLORS = [
  "rgba(0,255,100,0.12)",
  "rgba(0,100,255,0.12)",
  "rgba(255,0,80,0.12)",
  "rgba(255,150,0,0.12)",
  "rgba(150,0,255,0.12)",
];
const SCROLL_HEIGHT = 2000;
const PHASE_END     = 0.90;

// ─── Helpers ─────────────────────────────────────────────────────────────────
function lerp(a, b, t) { return a + (b - a) * t; }
function clamp(v, lo, hi) { return Math.max(lo, Math.min(hi, v)); }

// ─── 3D Object ───────────────────────────────────────────────────────────────
function HolographicObject({ visible, progress }) {
  const meshRef   = useRef();
  const pointsRef = useRef();

  const sc   = visible ? lerp(0, 1.8, clamp(progress * 4, 0, 1)) : 0;
  const posZ = visible ? lerp(10, 0, clamp(progress * 3, 0, 1))  : 10;

  useFrame(({ clock }) => {
    if (!meshRef.current || !visible) return;
    const t = clock.getElapsedTime();
    meshRef.current.rotation.y   = t * 0.15;
    meshRef.current.rotation.x   = Math.sin(t * 0.2) * 0.18;
    pointsRef.current.rotation.y = t * 0.15;
    pointsRef.current.rotation.x = Math.sin(t * 0.2) * 0.18;
  });

  return (
    <group scale={sc} position={[0, 0, posZ]}>
      {/* Outer shell */}
      <mesh ref={meshRef}>
        <icosahedronGeometry args={[1.5, 1]} />
        <meshBasicMaterial color="#00f2ff" wireframe transparent opacity={0.28} />
      </mesh>
      {/* Inner fill */}
      <mesh>
        <icosahedronGeometry args={[1.5, 1]} />
        <meshBasicMaterial color="#00f2ff" transparent opacity={0.04} side={THREE.DoubleSide} />
      </mesh>
      {/* Vertex dots */}
      <Points ref={pointsRef}>
        <icosahedronGeometry args={[1.5, 1]} />
        <PointMaterial transparent color="#ffffff" size={0.058} sizeAttenuation depthWrite={false} />
      </Points>
      {/* Core */}
      <mesh>
        <sphereGeometry args={[0.15, 12, 12]} />
        <meshBasicMaterial color="#00f2ff" transparent opacity={0.8} />
      </mesh>
    </group>
  );
}

// ─── Phrase ───────────────────────────────────────────────────────────────────
function Phrase({ text, scale, opacity, letterSpacing }) {
  return (
    <div className={s.phrase} style={{ transform: `scale(${scale})`, opacity }}>
      <span className={s.phraseText} style={{ letterSpacing: `${letterSpacing}em` }}>
        {text}
      </span>
    </div>
  );
}

// ─── Main ─────────────────────────────────────────────────────────────────────
export default function ProjectPage({ onExit }) {
  const [scroll, setScroll] = useState(0);
  const smoothScroll        = useRef(0);
  const rawScroll           = useRef(0);
  const rafRef              = useRef();

  // Raw scroll capture
  useEffect(() => {
    const fn = () => {
      const h = document.documentElement;
      rawScroll.current = h.scrollTop / (h.scrollHeight - h.clientHeight);
    };
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);

  // Smooth lerp loop
  useEffect(() => {
    const tick = () => {
      smoothScroll.current = lerp(smoothScroll.current, rawScroll.current, 0.07);
      setScroll(smoothScroll.current);
      rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
  }, []);

  const n             = PHRASES.length;
  const phaseProgress = clamp(scroll / PHASE_END, 0, 1);
  const phraseSlot    = phaseProgress * n;
  const activeIndex   = clamp(Math.floor(phraseSlot), 0, n - 1);
  const localT        = phraseSlot - activeIndex;
  const revealProgress= scroll > PHASE_END ? (scroll - PHASE_END) / (1 - PHASE_END) : 0;

  const currentScale   = 1 + Math.pow(localT, 3.5) * 60;
  const nextScale      = 0.04 + Math.pow(localT, 1.8) * 0.96;
  const currentOpacity = localT > 0.75 ? clamp((1 - localT) / 0.25, 0, 1) : 1;
  const nextOpacity    = clamp(localT * 2.2, 0, 1);

  const sectionPct = clamp(scroll * SCROLL_HEIGHT / 100, 0, 100);

  return (
    <div className={s.root}>
      {/* Scroll spacer */}
      <div style={{ height: `${SCROLL_HEIGHT}vh` }} />

      {/* 3D Canvas */}
      <div className={s.canvas}>
        <Canvas camera={{ position: [0, 0, 5], fov: 50 }}>
          <color attach="background" args={["#000000"]} />
          <Stars radius={100} depth={50} count={2500} factor={4} fade speed={0.5} />
          <ambientLight intensity={0.1} />
          <pointLight position={[5, 5, 5]}   intensity={3} color="#00f2ff" />
          <pointLight position={[-5, -3, -3]} intensity={2} color="#7c3aed" />
          <HolographicObject visible={revealProgress > 0} progress={revealProgress} />
          {revealProgress > 0.45 && (
            <OrbitControls enablePan={false} minDistance={2.5} maxDistance={9} enableDamping dampingFactor={0.06} />
          )}
        </Canvas>
      </div>

      {/* Ambient color layer */}
      <div
        className={s.colorLayer}
        style={{
          backgroundColor: BG_COLORS[activeIndex],
          opacity: revealProgress > 0.15 ? 0 : 1,
        }}
      />

      {/* Phrases */}
      <div
        className={s.phraseLayer}
        style={{ display: revealProgress > 0.12 ? "none" : "block" }}
      >
        <Phrase
          text={PHRASES[activeIndex]}
          scale={currentScale}
          opacity={currentOpacity}
          letterSpacing={0.08 + localT * 1.6}
        />
        {activeIndex + 1 < n && (
          <Phrase
            text={PHRASES[activeIndex + 1]}
            scale={nextScale}
            opacity={nextOpacity}
            letterSpacing={0.08}
          />
        )}
      </div>

      {/* HUD */}
      <div className={s.hud}>
        <span className={s.hudSection}>
          {String(activeIndex + 1).padStart(2, "0")}&nbsp;/&nbsp;{String(n).padStart(2, "0")}
        </span>
        <div className={s.hudBar}>
          <div className={s.hudFill} style={{ width: `${sectionPct}%` }} />
        </div>
      </div>

      {/* Orbit hint */}
      <div className={s.orbitHint} style={{ opacity: revealProgress > 0.6 ? 1 : 0 }}>
        ARRASTE PARA ORBITAR · SCROLL PARA ZOOM
      </div>

      {/* Scroll hint */}
      <div className={s.scrollHint} style={{ opacity: scroll < 0.025 ? 1 : 0 }}>
        <div className={s.scrollLine} />
        <span>scroll</span>
      </div>

      {/* Exit button */}
      <button className={s.exit} onClick={onExit} title="Voltar ao portfólio">
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
          <path d="M1 1l12 12M13 1L1 13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
        </svg>
        Sair
      </button>
    </div>
  );
}
