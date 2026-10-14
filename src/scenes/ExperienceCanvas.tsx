import React, { useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import type * as THREE from 'three'
import { WorldEnvironment } from './WorldEnvironment'

interface AmbientNodeProps {
  position?: [number, number, number]
}

const AmbientNode: React.FC<AmbientNodeProps> = ({ position = [0, 0, 0] }) => {
  const meshRef = useRef<THREE.Mesh>(null)

  useFrame((_, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.x += delta * 0.15
      meshRef.current.rotation.y += delta * 0.2
    }
  })

  return (
    <mesh ref={meshRef} position={position}>
      <octahedronGeometry args={[1.2, 0]} />
      <meshStandardMaterial
        color="#65E5FF"
        wireframe
        transparent
        opacity={0.35}
        roughness={0.2}
      />
    </mesh>
  )
}

export interface ExperienceCanvasProps {
  className?: string
}

export const ExperienceCanvas: React.FC<ExperienceCanvasProps> = ({ className = '' }) => {
  return (
    <div
      aria-hidden="true"
      className={`fixed inset-0 pointer-events-none z-0 overflow-hidden ${className}`}
    >
      <Canvas
        camera={{ position: [0, 0, 6], fov: 45 }}
        gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
        dpr={[1, 2]}
      >
        <WorldEnvironment />
        <AmbientNode position={[2.5, 0.5, 0]} />
        <AmbientNode position={[-2.8, -1.2, -1]} />
      </Canvas>
    </div>
  )
}
