import React, { useMemo, useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

export const StarfieldParticles: React.FC<{ count?: number; reducedMotion?: boolean }> = ({
  count = 240,
  reducedMotion = false,
}) => {
  const pointsRef = useRef<THREE.Points>(null)

  const [positions, colors] = useMemo(() => {
    const pos = new Float32Array(count * 3)
    const col = new Float32Array(count * 3)

    const colorCyan = new THREE.Color('#65E5FF')
    const colorViolet = new THREE.Color('#8175FF')
    const colorWhite = new THREE.Color('#F4F6FC')

    for (let i = 0; i < count; i++) {
      // Spatial volume
      pos[i * 3] = (Math.random() - 0.5) * 22
      pos[i * 3 + 1] = (Math.random() - 0.5) * 16
      pos[i * 3 + 2] = (Math.random() - 0.5) * 14 - 3

      // Color variation between cyan, violet, and white
      const rand = Math.random()
      const c = rand < 0.5 ? colorCyan : rand < 0.85 ? colorViolet : colorWhite
      col[i * 3] = c.r
      col[i * 3 + 1] = c.g
      col[i * 3 + 2] = c.b
    }

    return [pos, col]
  }, [count])

  useFrame((_, delta) => {
    if (!pointsRef.current || reducedMotion) return
    pointsRef.current.rotation.y += delta * 0.02
    pointsRef.current.rotation.x += delta * 0.008
  })

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
        <bufferAttribute
          attach="attributes-color"
          args={[colors, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.04}
        vertexColors
        transparent
        opacity={0.65}
        sizeAttenuation
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </points>
  )
}
