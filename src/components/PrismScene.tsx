import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Grid } from '@react-three/drei';
import * as THREE from 'three';
import type { PrismViewerState } from '@/types/prism';

interface PrismMeshProps {
  prismType: string;
  wireframe: boolean;
  autoRotate: boolean;
}

function PrismMesh({ prismType, wireframe, autoRotate }: PrismMeshProps) {
  const meshRef = useRef<THREE.Mesh>(null);

  const geometry = useMemo(() => {
    switch (prismType) {
      case 'triangular':
        return createTriangularPrism();
      case 'rectangular':
        return new THREE.BoxGeometry(2, 2, 3);
      case 'pentagonal':
        return createPentagonalPrism();
      case 'hexagonal':
        return createHexagonalPrism();
      case 'octagonal':
        return createOctagonalPrism();
      default:
        return new THREE.BoxGeometry(2, 2, 3);
    }
  }, [prismType]);

  useFrame((state) => {
    if (meshRef.current && autoRotate) {
      meshRef.current.rotation.x += 0.005;
      meshRef.current.rotation.y += 0.01;
    }
  });

  return (
    <mesh ref={meshRef} geometry={geometry}>
      <meshStandardMaterial
        color={wireframe ? '#000000' : '#d4d4d4'}
        wireframe={wireframe}
        transparent={!wireframe}
        opacity={wireframe ? 1 : 0.8}
      />
    </mesh>
  );
}

function createTriangularPrism(): THREE.BufferGeometry {
  const shape = new THREE.Shape();
  shape.moveTo(-1, -1);
  shape.lineTo(1, -1);
  shape.lineTo(0, 1);
  shape.lineTo(-1, -1);

  const extrudeSettings = {
    depth: 3,
    bevelEnabled: false,
  };

  return new THREE.ExtrudeGeometry(shape, extrudeSettings);
}

function createPentagonalPrism(): THREE.BufferGeometry {
  const shape = new THREE.Shape();
  const sides = 5;
  const radius = 1.5;

  for (let i = 0; i < sides; i++) {
    const angle = (i * 2 * Math.PI) / sides;
    const x = Math.cos(angle) * radius;
    const y = Math.sin(angle) * radius;
    
    if (i === 0) {
      shape.moveTo(x, y);
    } else {
      shape.lineTo(x, y);
    }
  }
  shape.lineTo(Math.cos(0) * radius, Math.sin(0) * radius);

  const extrudeSettings = {
    depth: 3,
    bevelEnabled: false,
  };

  return new THREE.ExtrudeGeometry(shape, extrudeSettings);
}

function createHexagonalPrism(): THREE.BufferGeometry {
  const shape = new THREE.Shape();
  const sides = 6;
  const radius = 1.5;

  for (let i = 0; i < sides; i++) {
    const angle = (i * 2 * Math.PI) / sides;
    const x = Math.cos(angle) * radius;
    const y = Math.sin(angle) * radius;
    
    if (i === 0) {
      shape.moveTo(x, y);
    } else {
      shape.lineTo(x, y);
    }
  }
  shape.lineTo(Math.cos(0) * radius, Math.sin(0) * radius);

  const extrudeSettings = {
    depth: 3,
    bevelEnabled: false,
  };

  return new THREE.ExtrudeGeometry(shape, extrudeSettings);
}

function createOctagonalPrism(): THREE.BufferGeometry {
  const shape = new THREE.Shape();
  const sides = 8;
  const radius = 1.5;

  for (let i = 0; i < sides; i++) {
    const angle = (i * 2 * Math.PI) / sides;
    const x = Math.cos(angle) * radius;
    const y = Math.sin(angle) * radius;
    
    if (i === 0) {
      shape.moveTo(x, y);
    } else {
      shape.lineTo(x, y);
    }
  }
  shape.lineTo(Math.cos(0) * radius, Math.sin(0) * radius);

  const extrudeSettings = {
    depth: 3,
    bevelEnabled: false,
  };

  return new THREE.ExtrudeGeometry(shape, extrudeSettings);
}

interface PrismSceneProps {
  viewerState: PrismViewerState;
}

export default function PrismScene({ viewerState }: PrismSceneProps) {
  return (
    <div className="w-full h-full bg-viewer-background border border-viewer-border rounded-lg overflow-hidden">
      <Canvas camera={{ position: [5, 5, 5], fov: 50 }}>
        <ambientLight intensity={0.4} />
        <directionalLight position={[5, 5, 5]} intensity={0.8} castShadow />
        <pointLight position={[-5, -5, -5]} intensity={0.3} />
        
        <PrismMesh
          prismType={viewerState.selectedPrism}
          wireframe={viewerState.wireframe}
          autoRotate={viewerState.autoRotate}
        />
        
        <Grid
          args={[10, 10]}
          cellSize={1}
          cellThickness={0.5}
          cellColor="#808080"
          sectionSize={5}
          sectionThickness={1}
          sectionColor="#404040"
          fadeDistance={25}
          fadeStrength={1}
          followCamera={false}
          infiniteGrid={true}
        />
        
        <OrbitControls
          enablePan={true}
          enableZoom={true}
          enableRotate={true}
          minDistance={3}
          maxDistance={20}
        />
      </Canvas>
    </div>
  );
}