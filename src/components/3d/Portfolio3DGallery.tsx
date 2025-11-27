import { useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Text, Box } from '@react-three/drei';
import * as THREE from 'three';

interface Project3DCardProps {
  position: [number, number, number];
  title: string;
  color: string;
  onClick: () => void;
  isActive: boolean;
}

function Project3DCard({ position, title, color, onClick, isActive }: Project3DCardProps) {
  const meshRef = useRef<THREE.Mesh>(null);
  const [hovered, setHovered] = useState(false);

  useFrame(() => {
    if (meshRef.current) {
      meshRef.current.rotation.y += 0.005;
      
      // Scale animation
      const targetScale = hovered ? 1.2 : isActive ? 1.1 : 1;
      meshRef.current.scale.lerp(
        new THREE.Vector3(targetScale, targetScale, targetScale),
        0.1
      );
    }
  });

  return (
    <group position={position}>
      <Box
        ref={meshRef}
        args={[2, 2.5, 0.2]}
        onClick={onClick}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
      >
        <meshStandardMaterial
          color={color}
          roughness={0.3}
          metalness={0.6}
          emissive={color}
          emissiveIntensity={hovered ? 0.4 : isActive ? 0.3 : 0.1}
        />
      </Box>
      
      <Text
        position={[0, 0, 0.15]}
        fontSize={0.3}
        color="white"
        anchorX="center"
        anchorY="middle"
        maxWidth={1.8}
      >
        {title}
      </Text>
    </group>
  );
}

interface Portfolio3DGalleryProps {
  projects: Array<{ id: string; name: string; color: string }>;
  onProjectClick: (projectId: string) => void;
  activeProjectId?: string;
}

function Scene({ projects, onProjectClick, activeProjectId }: Portfolio3DGalleryProps) {
  // Arrange projects in a circular pattern
  const radius = 5;
  const projectsWithPositions = projects.map((project, index) => {
    const angle = (index / projects.length) * Math.PI * 2;
    const x = Math.cos(angle) * radius;
    const z = Math.sin(angle) * radius;
    return { ...project, position: [x, 0, z] as [number, number, number] };
  });

  return (
    <>
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} intensity={1} />
      <pointLight position={[-10, -10, -10]} intensity={0.5} />
      <directionalLight position={[0, 5, 5]} intensity={0.8} />
      
      {projectsWithPositions.map((project) => (
        <Project3DCard
          key={project.id}
          position={project.position}
          title={project.name}
          color={project.color}
          onClick={() => onProjectClick(project.id)}
          isActive={project.id === activeProjectId}
        />
      ))}
    </>
  );
}

export default function Portfolio3DGallery(props: Portfolio3DGalleryProps) {
  return (
    <div className="w-full h-[600px] rounded-xl overflow-hidden bg-gradient-to-br from-gray-900 to-gray-800">
      <Canvas
        camera={{ position: [0, 3, 10], fov: 60 }}
        gl={{ antialias: true }}
      >
        <Scene {...props} />
      </Canvas>
    </div>
  );
}
