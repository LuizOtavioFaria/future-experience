import React, { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Sphere, MeshDistortMaterial } from "@react-three/drei";

export default function HoloObject({ theme }) {
  const meshRef = useRef();

  // Faz o objeto girar suavemente sozinho
  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    meshRef.current.rotation.x = t * 0.2;
    meshRef.current.rotation.y = t * 0.3;
  });

  return (
    <Sphere ref={meshRef} args={[1, 64, 64]} scale={1.8}>
      <MeshDistortMaterial
        color={theme === "light" ? "#0064dc" : "#00f2ff"}
        speed={2}
        distort={0.4}
        wireframe={true} // Isso cria o visual de "grade" da imagem
      />
    </Sphere>
  );
}