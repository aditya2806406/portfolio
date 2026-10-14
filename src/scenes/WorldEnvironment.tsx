import React from 'react'

export const WorldEnvironment: React.FC = () => {
  return (
    <>
      {/* Ambient illumination for base surface visibility */}
      <ambientLight intensity={0.5} />

      {/* Electric cyan primary key light */}
      <directionalLight
        position={[6, 8, 5]}
        intensity={1.2}
        color="#65E5FF"
      />

      {/* Violet rim light for cinematic edge contrast */}
      <directionalLight
        position={[-6, -4, -4]}
        intensity={1.0}
        color="#8175FF"
      />

      {/* Subtle top fill light */}
      <directionalLight
        position={[0, 10, 0]}
        intensity={0.4}
        color="#F4F6FC"
      />

      {/* Restrained atmospheric depth fog matching #080A10 */}
      <fog attach="fog" args={['#080A10', 5, 26]} />
    </>
  )
}
