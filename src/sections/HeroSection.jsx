import { useState, useEffect } from "react";
import { Canvas } from "@react-three/fiber";
import HoloObject from "../components/HoloObject";
import s from "./HeroSection.module.css";

export default function HeroSection() {
  const go = (id) => document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });

  const [theme, setTheme] = useState(
    () => document.documentElement.getAttribute("data-theme") || "dark"
  );

  useEffect(() => {
    const observer = new MutationObserver(() => {
      setTheme(document.documentElement.getAttribute("data-theme") || "dark");
    });
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme"] });
    return () => observer.disconnect();
  }, []);

  const lightBg = theme === "light"
    ? "linear-gradient(135deg, #dce8ff 0%, #c5d8ff 55%, transparent 100%)"
    : "radial-gradient(circle at center, #08101e 0%, #030509 55%, transparent 100%)";

  return (
    <section className={s.hero} id="home">
      <div className={s.grain} aria-hidden />
      <div className={s.dotgrid} aria-hidden />

      <div className={s.layout}>
        {/* ── Left ── */}
        <div className={s.content}>
          <span className={`chip ${s.eyebrow} anim-1`}>
            <span className={s.eyebrowDot} /> Portfolio · 2025
          </span>

          <h1 className={`${s.title} anim-2`}>
            <span className={s.titleLine}>EXPLORE</span>
            <span className={`${s.titleLine} ${s.titleOutline}`}>O FUTURO</span>
            <span className={s.titleLine}>DO WEB</span>
          </h1>

          <p className={`${s.sub} anim-3`}>
            Experiências 3D imersivas — onde código vira arte.
          </p>

          <div className={`${s.actions} anim-4`}>
            <button className={s.btnPrimary} onClick={() => go("project")}>
              Ver Projeto
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
            <button className={s.btnGhost} onClick={() => go("about-project")}>
              Saiba mais
            </button>
          </div>

          <div className={`${s.stats} anim-4`}>
            {[["3D", "WebGL Nativo"], ["R3F", "React Three Fiber"], ["∞", "Scroll Imersivo"]].map(([val, label]) => (
              <div key={label} className={s.stat}>
                <span className={s.statVal}>{val}</span>
                <span className={s.statLabel}>{label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* ── Right: portal ── */}
        <div className={s.portalWrap}>
          <div className={s.portal}>
            <div className={`${s.ring} ${s.ring1}`} />
            <div className={`${s.ring} ${s.ring2}`} />
            <div className={`${s.ring} ${s.ring3}`} />
            <div className={s.portalInner} style={{ background: lightBg }}>
              <Canvas
                camera={{ position: [0, 0, 4.5], fov: 52 }}
                gl={{ antialias: true, alpha: true }}
                style={{ background: "transparent", width: "100%", height: "100%" }}
              >
                <ambientLight intensity={theme === "light" ? 0.4 : 0.15} />
                <pointLight position={[4, 4, 4]}   intensity={theme === "light" ? 3 : 5} color={theme === "light" ? "#0064dc" : "#00f2ff"} />
                <pointLight position={[-4, -3, -3]} intensity={theme === "light" ? 2 : 3} color={theme === "light" ? "#6d28d9" : "#7c3aed"} />
                <HoloObject scale={1.1} autoRotate theme={theme} />
              </Canvas>
            </div>
          </div>
        </div>
      </div>

      <div className={s.scrollHint}>
        <div className={s.scrollLine} />
        <span>scroll</span>
      </div>
    </section>
  );
}
