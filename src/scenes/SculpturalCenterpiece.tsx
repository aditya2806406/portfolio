import React, { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import { sceneMotionState } from '@/animations/sceneStore'

interface SculpturalCenterpieceProps {
  reducedMotion?: boolean
}

export const SculpturalCenterpiece: React.FC<SculpturalCenterpieceProps> = ({ reducedMotion = false }) => {
  const groupRef = useRef<THREE.Group>(null)
  const coreRef = useRef<THREE.Mesh>(null)
  const innerRingRef = useRef<THREE.Mesh>(null)
  const outerRingRef = useRef<THREE.Mesh>(null)

  // Target vectors for smooth lerping
  const targetPos = useRef(new THREE.Vector3(0, 0, 0))
  const targetRot = useRef(new THREE.Euler(0, 0, 0))

  useFrame((_, delta) => {
    if (!groupRef.current) return

    const scroll = sceneMotionState.scrollProgress // 0 (hero) to 1 (about)
    const pointer = sceneMotionState.pointer

    // Smoothly interpolate pointer coordinate
    sceneMotionState.pointer.x += (sceneMotionState.targetPointer.x - sceneMotionState.pointer.x) * 0.08
    sceneMotionState.pointer.y += (sceneMotionState.targetPointer.y - sceneMotionState.pointer.y) * 0.08

    // Continuous subtle rotation
    if (!reducedMotion) {
      if (coreRef.current) {
        coreRef.current.rotation.y += delta * 0.35
        coreRef.current.rotation.x += delta * 0.15
      }
      if (innerRingRef.current) {
        innerRingRef.current.rotation.z -= delta * 0.4
        innerRingRef.current.rotation.x += delta * 0.2
      }
      if (outerRingRef.current) {
        outerRingRef.current.rotation.y += delta * 0.25
        outerRingRef.current.rotation.z += delta * 0.3
      }
    }

    // Scroll-driven position and scale transformation:
    // In Hero (scroll=0): center at [0, 0, 0], scale 1.05
    // As user scrolls towards About: moves right & down [1.8, -1.2, -1], scale 0.75
    const posX = THREE.MathUtils.lerp(0, 2.0, scroll)
    const posY = THREE.MathUtils.lerp(0.2, -1.5, scroll)
    const posZ = THREE.MathUtils.lerp(0, -1.2, scroll)
    const scale = THREE.MathUtils.lerp(1.05, 0.7, scroll)

    // Add pointer parallax displacement to centerpiece
    const parallaxFactor = reducedMotion ? 0 : 0.35
    targetPos.current.set(
      posX + pointer.x * parallaxFactor,
      posY + pointer.y * parallaxFactor,
      posZ
    )

    // Smoothly apply position and scale
    groupRef.current.position.lerp(targetPos.current, 0.08)
    groupRef.current.scale.setScalar(
      THREE.MathUtils.lerp(groupRef.current.scale.x, scale, 0.08)
    )

    // Pointer-induced tilt
    if (!reducedMotion) {
      targetRot.current.x = (pointer.y * -0.2) + (scroll * 0.3)
      targetRot.current.y = (pointer.x * 0.3) + (scroll * -0.5)
      groupRef.current.rotation.x = THREE.MathUtils.lerp(groupRef.current.rotation.x, targetRot.current.x, 0.06)
      groupRef.current.rotation.y = THREE.MathUtils.lerp(groupRef.current.rotation.y, targetRot.current.y, 0.06)
    }
  })

  return (
    <group ref={groupRef} position={[0, 0.2, 0]}>
      {/* Central faceted metallic core */}
      <mesh ref={coreRef}>
        <icosahedronGeometry args={[1.1, 1]} />
        <meshStandardMaterial
          color="#E2E8F4"
          metalness={0.92}
          roughness={0.16}
          emissive="#101522"
          emissiveIntensity={0.2}
        />
      </mesh>

      {/* Primary electric cyan orbital ring */}
      <mesh ref={innerRingRef} rotation={[Math.PI / 4, 0, 0]}>
        <torusGeometry args={[1.65, 0.035, 16, 80]} />
        <meshStandardMaterial
          color="#65E5FF"
          emissive="#65E5FF"
          emissiveIntensity={0.45}
          metalness={0.8}
          roughness={0.2}
        />
      </mesh>

      {/* Secondary violet tilted outer ring */}
      <mesh ref={outerRingRef} rotation={[-Math.PI / 3, Math.PI / 6, 0]}>
        <torusGeometry args={[2.15, 0.025, 16, 90]} />
        <meshStandardMaterial
          color="#8175FF"
          emissive="#8175FF"
          emissiveIntensity={0.4}
          metalness={0.85}
          roughness={0.25}
        />
      </mesh>

      {/* Concentric floating satellite nodes */}
      <group position={[1.4, 0.8, 0.4]}>
        <mesh>
          <octahedronGeometry args={[0.15, 0]} />
          <meshStandardMaterial color="#65E5FF" emissive="#65E5FF" emissiveIntensity={0.8} />
        </mesh>
      </group>

      <group position={[-1.5, -0.6, -0.3]}>
        <mesh>
          <octahedronGeometry args={[0.12, 0]} />
          <meshStandardMaterial color="#8175FF" emissive="#8175FF" emissiveIntensity={0.8} />
        </mesh>
      </group>
    </group>
  )
}
