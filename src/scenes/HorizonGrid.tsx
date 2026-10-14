import React from 'react'

export const HorizonGrid: React.FC = () => {
  return (
    <group position={[0, -3.8, -6]}>
      {/* Perspective horizon grid */}
      <gridHelper
        args={[36, 24, '#65E5FF', '#1E2638']}
        rotation={[0, 0, 0]}
        position={[0, 0, 0]}
      />

      {/* Distant cyan horizon beam */}
      <mesh position={[0, 0.05, -10]}>
        <planeGeometry args={[40, 0.1]} />
        <meshBasicMaterial
          color="#65E5FF"
          transparent
          opacity={0.35}
        />
      </mesh>

      {/* Distant violet horizon glow bar */}
      <mesh position={[0, 0.15, -10]}>
        <planeGeometry args={[20, 0.25]} />
        <meshBasicMaterial
          color="#8175FF"
          transparent
          opacity={0.2}
        />
      </mesh>
    </group>
  )
}
