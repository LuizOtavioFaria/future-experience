import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Points, PointMaterial } from "@react-three/drei";
import * as THREE from "three";

export default function HoloObject({ scale = 1, autoRotate = true, theme = "dark" }) {
  const meshRef   = useRef();
  const pointsRef = useRef();

  const wireColor  = theme === "light" ? "#0064dc" : "#00f2ff";
  const pointColor = theme === "light" ? "#003fa3" : "#ffffff";
  const coreColor  = theme === "light" ? "#0064dc" : "#00f2ff";

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    if (meshRef.current && autoRotate) {
      meshRef.current.rotation.y = t * 0.22;
      meshRef.current.rotation.x = Math.sin(t * 0.18) * 0.25;
    }
    if (pointsRef.current && autoRotate) {
      pointsRef.current.rotation.y = t * 0.22;
      pointsRef.current.rotation.x = Math.sin(t * 0.18) * 0.25;
    }
  });

  return (
    <group scale={scale}>
      <mesh ref={meshRef}>
        <icosahedronGeometry args={[1.5, 1]} />
        <meshBasicMaterial color={wireColor} wireframe transparent opacity={0.28} />
      </mesh>
      <mesh>
        <icosahedronGeometry args={[1.5, 1]} />
        <meshBasicMaterial color={wireColor} transparent opacity={0.04} side={THREE.DoubleSide} />
      </mesh>
      <Points ref={pointsRef}>
        <icosahedronGeometry args={[1.5, 1]} />
        <PointMaterial
          transparent color={pointColor} size={0.055}
          sizeAttenuation depthWrite={false} opacity={0.9}
        />
      </Points>
      <mesh>
        <sphereGeometry args={[0.18, 16, 16]} />
        <meshBasicMaterial color={coreColor} transparent opacity={0.8} />
      </mesh>
    </group>
  );
}
