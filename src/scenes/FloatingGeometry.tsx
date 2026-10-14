import React, { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import { sceneMotionState } from '@/animations/sceneStore'

interface FloatingItem {
  id: number
  basePos: [number, number, number]
  rotationSpeed: [number, number, number]
  geometryType: 'dodecahedron' | 'tetrahedron' | 'ring' | 'prism'
  scale: number
  color: string
}

export const FloatingGeometry: React.FC<{ reducedMotion?: boolean }> = ({ reducedMotion = false }) => {
  const groupRef = useRef<THREE.Group>(null)

  // Pre-generate stable positions for floating shapes
  const items: FloatingItem[] = useMemo(() => [
    {
      id: 1,
      basePos: [-3.8, 2.2, -3.5],
      rotationSpeed: [0.2, 0.3, 0.1],
      geometryType: 'dodecahedron',
      scale: 0.55,
      color: '#65E5FF',
    },
    {
      id: 2,
      basePos: [3.9, 1.8, -4.0],
      rotationSpeed: [-0.15, 0.25, 0.1],
      geometryType: 'tetrahedron',
      scale: 0.65,
      color: '#8175FF',
    },
    {
      id: 3,
      basePos: [-4.2, -1.8, -2.5],
      rotationSpeed: [0.1, -0.2, 0.3],
      geometryType: 'prism',
      scale: 0.45,
      color: '#A4ADBF',
    },
    {
      id: 4,
      basePos: [3.5, -2.4, -3.0],
      rotationSpeed: [0.25, 0.15, -0.2],
      geometryType: 'ring',
      scale: 0.5,
      color: '#65E5FF',
    },
    {
      id: 5,
      basePos: [0.8, 3.2, -5.5],
      rotationSpeed: [-0.1, 0.2, 0.1],
      geometryType: 'dodecahedron',
      scale: 0.4,
      color: '#8175FF',
    },
    {
      id: 6,
      basePos: [-2.1, -3.2, -4.5],
      rotationSpeed: [0.2, -0.1, 0.15],
      geometryType: 'tetrahedron',
      scale: 0.5,
      color: '#65E5FF',
    },
  ], [])

  useFrame(({ clock }) => {
    if (!groupRef.current) return
    const t = clock.getElapsedTime()
    const pointer = sceneMotionState.pointer
    const scroll = sceneMotionState.scrollProgress

    // Parallax shift based on pointer
    const parallax = reducedMotion ? 0 : 0.2
    groupRef.current.position.x = THREE.MathUtils.lerp(
      groupRef.current.position.x,
      pointer.x * parallax,
      0.05
    )
    groupRef.current.position.y = THREE.MathUtils.lerp(
      groupRef.current.position.y,
      pointer.y * parallax + (scroll * -1.5),
      0.05
    )

    // Gentle floating oscillation for each child mesh
    if (!reducedMotion) {
      groupRef.current.children.forEach((child, idx) => {
        const item = items[idx]
        if (!item) return
        child.position.y = item.basePos[1] + Math.sin(t * 0.8 + idx * 1.5) * 0.15
        child.rotation.x += item.rotationSpeed[0] * 0.015
        child.rotation.y += item.rotationSpeed[1] * 0.015
        child.rotation.z += item.rotationSpeed[2] * 0.015
      })
    }
  })

  return (
    <group ref={groupRef}>
      {items.map((item) => (
        <mesh key={item.id} position={item.basePos} scale={item.scale}>
          {item.geometryType === 'dodecahedron' && <dodecahedronGeometry args={[1, 0]} />}
          {item.geometryType === 'tetrahedron' && <tetrahedronGeometry args={[1, 0]} />}
          {item.geometryType === 'ring' && <torusGeometry args={[1, 0.05, 12, 36]} />}
          {item.geometryType === 'prism' && <cylinderGeometry args={[0.3, 0.3, 1.2, 4]} />}
          
          <meshStandardMaterial
            color={item.color}
            wireframe={item.geometryType === 'prism' || item.geometryType === 'dodecahedron'}
            metalness={0.8}
            roughness={0.25}
            transparent
            opacity={0.6}
            emissive={item.color}
            emissiveIntensity={0.2}
          />
        </mesh>
      ))}
    </group>
  )
}
