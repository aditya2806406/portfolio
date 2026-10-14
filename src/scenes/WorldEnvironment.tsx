import React from 'react'

export const WorldEnvironment: React.FC = () => {
  return (
    <>
      {/* Subtle atmospheric ambient and key lighting */}
      <ambientLight intensity={0.4} />
      <directionalLight position={[10, 15, 10]} intensity={0.8} color="#65E5FF" />
      <directionalLight position={[-10, -10, -5]} intensity={0.4} color="#8175FF" />
      
      {/* Background depth fog matching #080A10 */}
      <fog attach="fog" args={['#080A10', 8, 30]} />
    </>
  )
}
