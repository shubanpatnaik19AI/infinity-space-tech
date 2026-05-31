import { Suspense, useMemo, useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Stars, Html } from "@react-three/drei";
import * as THREE from "three";

export type GalaxyMarker = {
  name: string;
  type: string;
  position: [number, number, number];
  color: string;
  desc: string;
  mission: string;
};

export const GALAXY_MARKERS: GalaxyMarker[] = [
  { name: "Sol System", type: "Home star", position: [12, 0, 4], color: "#fde047", desc: "Our origin — 8 planets, 1 spacefaring species.", mission: "Mission control" },
  { name: "Alpha Centauri", type: "Triple-star", position: [12.4, 0.1, 4.3], color: "#fef08a", desc: "Nearest neighbor at 4.37 ly — Breakthrough Starshot relay.", mission: "Light-sail probe — 2048" },
  { name: "TRAPPIST-1", type: "Red dwarf cluster", position: [11, -0.3, 6], color: "#fb7185", desc: "Seven terrestrial worlds, three habitable.", mission: "Biosignature survey — 2052" },
  { name: "Kepler-90", type: "Eight-planet system", position: [8, 0.4, 9], color: "#fef08a", desc: "Sun-like analog rich in planets.", mission: "AI-piloted probe — 2080" },
  { name: "Orion Nebula", type: "Stellar nursery", position: [6, -0.6, 7], color: "#a78bfa", desc: "Active star-forming region, 1,344 ly away.", mission: "Deep imaging array — 2055" },
  { name: "Pleiades", type: "Open cluster", position: [13, 0.5, 6.5], color: "#7dd3fc", desc: "Young blue stars, navigational beacon.", mission: "Beacon network" },
  { name: "Sagittarius A*", type: "Galactic core SMBH", position: [0, 0, 0], color: "#f0abfc", desc: "Supermassive black hole at the heart of the Milky Way.", mission: "Gravitational lensing observatory — 2090" },
  { name: "Perseus Arm", type: "Spiral arm", position: [18, 0.2, -2], color: "#60a5fa", desc: "Outer arm dense with O-type giants.", mission: "Long-range telescope grid" },
  { name: "Carina Nebula", type: "Emission nebula", position: [-4, -0.3, 10], color: "#f472b6", desc: "Massive star-forming region near Eta Carinae.", mission: "Stellar evolution lab" },
  { name: "Andromeda Beacon", type: "Intergalactic ping", position: [22, 1.2, 8], color: "#34d399", desc: "Proposed signal target — 2.5 million ly away.", mission: "Generational message — 2200" },
];

function GalaxyDisc() {
  const ref = useRef<THREE.Points>(null);
  const geometry = useMemo(() => {
    const count = 18000;
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);
    const arms = 4;
    const armOffset = (Math.PI * 2) / arms;
    const palette = [
      new THREE.Color("#c084fc"),
      new THREE.Color("#7dd3fc"),
      new THREE.Color("#fde68a"),
      new THREE.Color("#fb7185"),
    ];
    for (let i = 0; i < count; i++) {
      const radius = Math.pow(Math.random(), 0.6) * 22;
      const arm = Math.floor(Math.random() * arms);
      const angle = radius * 0.35 + arm * armOffset + (Math.random() - 0.5) * 0.5;
      const spread = (1 - radius / 22) * 0.6;
      positions[i * 3] = Math.cos(angle) * radius + (Math.random() - 0.5) * 2 * spread;
      positions[i * 3 + 1] = (Math.random() - 0.5) * (0.6 + (1 - radius / 22) * 1.2);
      positions[i * 3 + 2] = Math.sin(angle) * radius + (Math.random() - 0.5) * 2 * spread;
      const c = palette[(arm + Math.floor(Math.random() * 2)) % palette.length];
      colors[i * 3] = c.r;
      colors[i * 3 + 1] = c.g;
      colors[i * 3 + 2] = c.b;
    }
    const g = new THREE.BufferGeometry();
    g.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    g.setAttribute("color", new THREE.BufferAttribute(colors, 3));
    return g;
  }, []);

  useFrame((_, dt) => {
    if (ref.current) ref.current.rotation.y += dt * 0.02;
  });

  return (
    <points ref={ref}>
      <primitive object={geometry} attach="geometry" />
      <pointsMaterial size={0.08} vertexColors transparent opacity={0.9} sizeAttenuation depthWrite={false} blending={THREE.AdditiveBlending} />
    </points>
  );
}

function CoreGlow() {
  return (
    <mesh>
      <sphereGeometry args={[1.2, 32, 32]} />
      <meshBasicMaterial color="#fef3c7" transparent opacity={0.85} toneMapped={false} />
      <pointLight color="#fde68a" intensity={2} distance={40} />
    </mesh>
  );
}

function Marker({ m, onSelect, selected }: { m: GalaxyMarker; onSelect: (m: GalaxyMarker) => void; selected: boolean }) {
  const [hovered, setHovered] = useState(false);
  const ref = useRef<THREE.Mesh>(null);
  useFrame((s) => {
    if (ref.current) {
      const pulse = 1 + Math.sin(s.clock.elapsedTime * 2 + m.position[0]) * 0.15;
      ref.current.scale.setScalar((selected || hovered ? 1.6 : 1) * pulse);
    }
  });
  return (
    <group position={m.position}>
      <mesh
        ref={ref}
        onPointerOver={(e) => { e.stopPropagation(); setHovered(true); document.body.style.cursor = "pointer"; }}
        onPointerOut={() => { setHovered(false); document.body.style.cursor = "default"; }}
        onClick={(e) => { e.stopPropagation(); onSelect(m); }}
      >
        <sphereGeometry args={[0.25, 16, 16]} />
        <meshBasicMaterial color={m.color} toneMapped={false} />
      </mesh>
      {(hovered || selected) && (
        <Html distanceFactor={18} position={[0, 0.6, 0]} center>
          <div className="pointer-events-none whitespace-nowrap rounded-full bg-background/90 px-3 py-1 text-xs font-semibold text-foreground shadow-glow backdrop-blur">
            {m.name}
          </div>
        </Html>
      )}
    </group>
  );
}

export default function GalaxyScene({
  onSelect,
  selected,
}: {
  onSelect: (m: GalaxyMarker | null) => void;
  selected: GalaxyMarker | null;
}) {
  return (
    <Canvas camera={{ position: [0, 18, 32], fov: 55 }} onPointerMissed={() => onSelect(null)} gl={{ antialias: true }}>
      <color attach="background" args={["#05030f"]} />
      <fog attach="fog" args={["#05030f", 50, 110]} />
      <ambientLight intensity={0.25} />
      <Suspense fallback={null}>
        <Stars radius={180} depth={90} count={12000} factor={5} saturation={0} fade speed={1} />
        <CoreGlow />
        <GalaxyDisc />
        {GALAXY_MARKERS.map((m) => (
          <Marker key={m.name} m={m} onSelect={onSelect} selected={selected?.name === m.name} />
        ))}
      </Suspense>
      <OrbitControls enablePan={false} minDistance={10} maxDistance={70} autoRotate autoRotateSpeed={0.15} />
    </Canvas>
  );
}
