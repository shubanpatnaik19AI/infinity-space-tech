import { Suspense, useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Stars, Html, Trail } from "@react-three/drei";
import * as THREE from "three";
import type { StarSystem, SystemPlanet } from "@/lib/systems-data";

function Star({ s }: { s: StarSystem["star"] }) {
  const ref = useRef<THREE.Mesh>(null);
  useFrame((_, dt) => {
    if (ref.current) ref.current.rotation.y += dt * 0.1;
  });
  return (
    <mesh ref={ref}>
      <sphereGeometry args={[s.size, 64, 64]} />
      <meshStandardMaterial emissive={s.emissive} emissiveIntensity={s.intensity} color={s.color} toneMapped={false} />
      <pointLight intensity={3} distance={80} decay={1.2} color={s.light} />
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
      <lineBasicMaterial color="#7c3aed" transparent opacity={0.2} />
    </line>
  );
}

function Planet({ data, onSelect, selected }: { data: SystemPlanet; onSelect: (p: SystemPlanet) => void; selected: boolean }) {
  const groupRef = useRef<THREE.Group>(null);
  const meshRef = useRef<THREE.Mesh>(null);
  const angleRef = useRef(Math.random() * Math.PI * 2);
  const [hovered, setHovered] = useState(false);

  useFrame((_, dt) => {
    angleRef.current += dt * data.speed * 0.12;
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
        <meshStandardMaterial color={data.color} emissive={data.emissive} emissiveIntensity={selected ? 0.8 : 0.3} roughness={0.7} />
      </mesh>
      {data.ring && (
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

function Probe({ radius }: { radius: number }) {
  const ref = useRef<THREE.Mesh>(null);
  useFrame((state) => {
    const t = state.clock.elapsedTime * 0.2;
    if (ref.current) {
      ref.current.position.x = Math.cos(t) * radius;
      ref.current.position.z = Math.sin(t) * radius;
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

export default function SystemScene({
  system,
  onSelect,
  selected,
}: {
  system: StarSystem;
  onSelect: (p: SystemPlanet | null) => void;
  selected: SystemPlanet | null;
}) {
  const maxDist = Math.max(...system.planets.map((p) => p.distance));
  return (
    <Canvas
      camera={{ position: [0, maxDist * 0.9, maxDist * 1.6], fov: 55 }}
      onPointerMissed={() => onSelect(null)}
      gl={{ antialias: true }}
    >
      <color attach="background" args={["#08051a"]} />
      <fog attach="fog" args={["#08051a", maxDist * 2, maxDist * 5]} />
      <ambientLight intensity={0.15} />
      <Suspense fallback={null}>
        <Stars radius={140} depth={70} count={9000} factor={4} saturation={0} fade speed={1} />
        <Star s={system.star} />
        {system.planets.map((p) => (
          <group key={p.name}>
            <OrbitRing distance={p.distance} />
            <Planet data={p} onSelect={onSelect} selected={selected?.name === p.name} />
          </group>
        ))}
        <Probe radius={maxDist * 0.6} />
      </Suspense>
      <OrbitControls enablePan={false} minDistance={maxDist * 0.4} maxDistance={maxDist * 3.5} autoRotate autoRotateSpeed={0.3} />
    </Canvas>
  );
}
