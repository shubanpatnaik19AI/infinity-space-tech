import { Suspense, useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Stars, Html, Trail } from "@react-three/drei";
import * as THREE from "three";

type PlanetData = {
  name: string;
  color: string;
  emissive: string;
  size: number;
  distance: number;
  speed: number;
  desc: string;
  mission: string;
};

const PLANETS: PlanetData[] = [
  { name: "Mercury", color: "#a8a29e", emissive: "#3f3f46", size: 0.4, distance: 4, speed: 0.8, desc: "Closest to the sun", mission: "Solar relay station — 2034" },
  { name: "Venus", color: "#fbbf24", emissive: "#92400e", size: 0.7, distance: 6, speed: 0.6, desc: "Atmospheric inferno", mission: "Cloud-city probe — 2036" },
  { name: "Earth", color: "#38bdf8", emissive: "#1e40af", size: 0.75, distance: 8, speed: 0.5, desc: "Home base", mission: "Mission control" },
  { name: "Mars", color: "#f97316", emissive: "#7c2d12", size: 0.55, distance: 10.5, speed: 0.4, desc: "The red frontier", mission: "Crewed landing — 2032" },
  { name: "Jupiter", color: "#fcd34d", emissive: "#78350f", size: 1.6, distance: 14, speed: 0.25, desc: "Gas giant guardian", mission: "Europa launchpad — 2038" },
  { name: "Saturn", color: "#fde68a", emissive: "#713f12", size: 1.3, distance: 18, speed: 0.18, desc: "Lord of rings", mission: "Titan survey — 2045" },
  { name: "Kepler-442b", color: "#c084fc", emissive: "#581c87", size: 0.9, distance: 22, speed: 0.1, desc: "Habitable exoplanet", mission: "Light-sail voyage — 2050" },
];

function Sun() {
  const ref = useRef<THREE.Mesh>(null);
  useFrame((_, dt) => {
    if (ref.current) ref.current.rotation.y += dt * 0.1;
  });
  return (
    <mesh ref={ref}>
      <sphereGeometry args={[1.6, 64, 64]} />
      <meshStandardMaterial emissive="#fbbf24" emissiveIntensity={2} color="#fde047" toneMapped={false} />
      <pointLight intensity={3} distance={60} decay={1.2} color="#fff7ed" />
    </mesh>
  );
}

function OrbitRing({ distance }: { distance: number }) {
  const points = Array.from({ length: 129 }, (_, i) => {
    const a = (i / 128) * Math.PI * 2;
    return new THREE.Vector3(Math.cos(a) * distance, 0, Math.sin(a) * distance);
  });
  const geom = new THREE.BufferGeometry().setFromPoints(points);
  return (
    <line>
      <primitive object={geom} attach="geometry" />
      <lineBasicMaterial color="#7c3aed" transparent opacity={0.25} />
    </line>
  );
}

function Planet({ data, onSelect, selected }: { data: PlanetData; onSelect: (p: PlanetData) => void; selected: boolean }) {
  const groupRef = useRef<THREE.Group>(null);
  const meshRef = useRef<THREE.Mesh>(null);
  const angleRef = useRef(Math.random() * Math.PI * 2);
  const [hovered, setHovered] = useState(false);

  useFrame((_, dt) => {
    angleRef.current += dt * data.speed * 0.15;
    if (groupRef.current) {
      groupRef.current.position.x = Math.cos(angleRef.current) * data.distance;
      groupRef.current.position.z = Math.sin(angleRef.current) * data.distance;
    }
    if (meshRef.current) meshRef.current.rotation.y += dt * 0.5;
  });

  return (
    <group ref={groupRef}>
      <mesh
        ref={meshRef}
        onPointerOver={(e) => { e.stopPropagation(); setHovered(true); document.body.style.cursor = "pointer"; }}
        onPointerOut={() => { setHovered(false); document.body.style.cursor = "default"; }}
        onClick={(e) => { e.stopPropagation(); onSelect(data); }}
        scale={hovered || selected ? 1.25 : 1}
      >
        <sphereGeometry args={[data.size, 48, 48]} />
        <meshStandardMaterial
          color={data.color}
          emissive={data.emissive}
          emissiveIntensity={selected ? 0.8 : 0.3}
          roughness={0.7}
        />
      </mesh>
      {data.name === "Saturn" && (
        <mesh rotation={[Math.PI / 2.2, 0, 0]}>
          <ringGeometry args={[data.size * 1.4, data.size * 2.2, 64]} />
          <meshBasicMaterial color="#fde68a" side={THREE.DoubleSide} transparent opacity={0.5} />
        </mesh>
      )}
      {(hovered || selected) && (
        <Html distanceFactor={12} position={[0, data.size + 0.6, 0]} center>
          <div className="pointer-events-none whitespace-nowrap rounded-full bg-background/90 px-3 py-1 text-xs font-semibold text-foreground shadow-glow backdrop-blur">
            {data.name}
          </div>
        </Html>
      )}
    </group>
  );
}

function Spacecraft() {
  const ref = useRef<THREE.Mesh>(null);
  useFrame((state) => {
    const t = state.clock.elapsedTime * 0.2;
    if (ref.current) {
      ref.current.position.x = Math.cos(t) * 12;
      ref.current.position.z = Math.sin(t) * 12;
      ref.current.position.y = Math.sin(t * 2) * 1.5;
      ref.current.rotation.y = -t + Math.PI / 2;
    }
  });
  return (
    <Trail width={1.5} length={6} color="#c084fc" attenuation={(w) => w * w}>
      <mesh ref={ref}>
        <coneGeometry args={[0.15, 0.5, 8]} />
        <meshStandardMaterial color="#e9d5ff" emissive="#a855f7" emissiveIntensity={1.5} />
      </mesh>
    </Trail>
  );
}

export default function SolarScene({ onSelect, selected }: { onSelect: (p: PlanetData | null) => void; selected: PlanetData | null }) {
  return (
    <Canvas
      camera={{ position: [0, 18, 28], fov: 55 }}
      onPointerMissed={() => onSelect(null)}
      gl={{ antialias: true }}
    >
      <color attach="background" args={["#08051a"]} />
      <fog attach="fog" args={["#08051a", 35, 80]} />
      <ambientLight intensity={0.15} />
      <Suspense fallback={null}>
        <Stars radius={120} depth={60} count={8000} factor={4} saturation={0} fade speed={1} />
        <Sun />
        {PLANETS.map((p) => (
          <group key={p.name}>
            <OrbitRing distance={p.distance} />
            <Planet data={p} onSelect={onSelect} selected={selected?.name === p.name} />
          </group>
        ))}
        <Spacecraft />
      </Suspense>
      <OrbitControls
        enablePan={false}
        minDistance={8}
        maxDistance={50}
        autoRotate
        autoRotateSpeed={0.3}
      />
    </Canvas>
  );
}

export { PLANETS };
export type { PlanetData };
