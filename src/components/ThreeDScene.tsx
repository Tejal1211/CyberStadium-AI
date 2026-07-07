"use client";

import React, { useRef, useState, useEffect } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Points, PointMaterial } from "@react-three/drei";
import * as THREE from "three";

// Mouse interactive tracker for parallax
function MouseTracker({ children }: { children: React.ReactNode }) {
  const groupRef = useRef<THREE.Group>(null);
  const { viewport } = useThree();
  const [mouse, setMouse] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      // Normalize mouse to -1 to 1 range
      const x = (e.clientX / window.innerWidth) * 2 - 1;
      const y = -(e.clientY / window.innerHeight) * 2 + 1;
      setMouse({ x, y });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  useFrame(() => {
    if (groupRef.current) {
      // Calculate target rotation based on mouse coordinates
      const targetX = (mouse.y * viewport.height) * 0.05;
      const targetY = (mouse.x * viewport.width) * 0.05;
      
      // Interpolate for smooth parallax movement
      groupRef.current.rotation.x += (targetX - groupRef.current.rotation.x) * 0.05;
      groupRef.current.rotation.y += (targetY - groupRef.current.rotation.y) * 0.05;
    }
  });

  return <group ref={groupRef}>{children}</group>;
}

// Spinning Holographic Football (Icosahedron wireframe resembles football panels)
function HolographicFootball() {
  const meshRef = useRef<THREE.Mesh>(null);
  const outerMeshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    if (meshRef.current) {
      meshRef.current.rotation.y = time * 0.25;
      meshRef.current.rotation.x = time * 0.15;
      meshRef.current.position.y = Math.sin(time) * 0.15;
    }
    if (outerMeshRef.current) {
      outerMeshRef.current.rotation.y = -time * 0.1;
      outerMeshRef.current.rotation.z = time * 0.08;
      outerMeshRef.current.position.y = Math.sin(time) * 0.15;
    }
  });

  return (
    <group position={[0, 0, 0]}>
      {/* Inner soccer ball core */}
      <mesh ref={meshRef}>
        <icosahedronGeometry args={[1.5, 1]} />
        <meshBasicMaterial 
          color="#00E5FF" 
          wireframe 
          transparent 
          opacity={0.4} 
          blending={THREE.AdditiveBlending}
        />
      </mesh>

      {/* Glowing vertices */}
      <mesh ref={outerMeshRef}>
        <icosahedronGeometry args={[1.54, 1]} />
        <meshBasicMaterial 
          color="#00FF88" 
          wireframe 
          transparent 
          opacity={0.15} 
          blending={THREE.AdditiveBlending}
        />
      </mesh>
      
      {/* Point light within the ball */}
      <pointLight color="#00E5FF" intensity={2} distance={10} />
    </group>
  );
}

// Holographic Stadium Structure
function StadiumWireframe() {
  const stadiumRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    if (stadiumRef.current) {
      stadiumRef.current.rotation.y = time * 0.05;
    }
  });

  return (
    <group ref={stadiumRef} position={[0, -1.8, 0]}>
      {/* Outer Stadium Ring */}
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[4.5, 5, 0.8, 32, 4, true]} />
        <meshBasicMaterial 
          color="#6C63FF" 
          wireframe 
          transparent 
          opacity={0.25} 
          blending={THREE.AdditiveBlending}
        />
      </mesh>

      {/* Mid Stadium Ring */}
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[3.8, 4.2, 0.6, 24, 3, true]} />
        <meshBasicMaterial 
          color="#00E5FF" 
          wireframe 
          transparent 
          opacity={0.3} 
          blending={THREE.AdditiveBlending}
        />
      </mesh>

      {/* Inner Pitch Border Ring */}
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[2.8, 2.8, 0.1, 32, 1, true]} />
        <meshBasicMaterial 
          color="#00FF88" 
          wireframe 
          transparent 
          opacity={0.4} 
          blending={THREE.AdditiveBlending}
        />
      </mesh>

      {/* Ground Field Grid */}
      <gridHelper args={[8, 20, "#6C63FF", "#1a1f3c"]} position={[0, -0.4, 0]} />
      
      {/* Vertical Tech Light Beams */}
      <LightBeam position={[-3, 2, -3]} height={5} color="#00E5FF" />
      <LightBeam position={[3, 2, 3]} height={5} color="#00E5FF" />
      <LightBeam position={[-3, 2, 3]} height={5} color="#00FF88" />
      <LightBeam position={[3, 2, -3]} height={5} color="#00FF88" />
    </group>
  );
}

// Vertical Light Beam Component
function LightBeam({ position, height, color }: { position: [number, number, number]; height: number; color: string }) {
  return (
    <mesh position={position}>
      <cylinderGeometry args={[0.02, 0.05, height, 8, 1, true]} />
      <meshBasicMaterial 
        color={color} 
        transparent 
        opacity={0.15} 
        blending={THREE.AdditiveBlending}
      />
    </mesh>
  );
}

function createParticlePositions(count: number) {
  const positions = new Float32Array(count * 3);

  for (let i = 0; i < count; i++) {
    positions[i * 3] = (Math.random() - 0.5) * 15;
    positions[i * 3 + 1] = (Math.random() - 0.5) * 12;
    positions[i * 3 + 2] = (Math.random() - 0.5) * 15;
  }

  return positions;
}

// Glowing Floating Particles
function FloatingParticles() {
  const pointsRef = useRef<THREE.Points>(null);
  const [positions] = useState(() => createParticlePositions(300));

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    if (pointsRef.current) {
      pointsRef.current.rotation.y = time * 0.02;
      pointsRef.current.rotation.x = time * 0.01;
    }
  });

  return (
    <Points positions={positions} stride={3} ref={pointsRef}>
      <PointMaterial
        transparent
        color="#00E5FF"
        size={0.06}
        sizeAttenuation={true}
        depthWrite={false}
        opacity={0.6}
        blending={THREE.AdditiveBlending}
      />
    </Points>
  );
}

export default function ThreeDScene() {
  return (
    <div className="absolute inset-0 w-full h-full min-h-[500px] overflow-hidden z-0">
      {/* Visual Ambient Overlay */}
      <div className="absolute inset-0 bg-radial-gradient from-transparent via-[#050816]/70 to-[#050816] z-10 pointer-events-none" />
      
      <Canvas
        camera={{ position: [0, 1.5, 6], fov: 60 }}
        gl={{ antialias: true, alpha: true }}
      >
        <ambientLight intensity={0.4} />
        <directionalLight position={[5, 10, 5]} intensity={1.5} />
        
        <MouseTracker>
          <HolographicFootball />
          <StadiumWireframe />
          <FloatingParticles />
        </MouseTracker>
      </Canvas>
    </div>
  );
}
