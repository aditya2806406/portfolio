import React, { useRef } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import * as THREE from 'three'
import { sceneMotionState } from '@/animations/sceneStore'

interface CameraControllerProps {
  reducedMotion?: boolean
}

export const CameraController: React.FC<CameraControllerProps> = ({ reducedMotion = false }) => {
  const { camera } = useThree()
  const targetCameraPos = useRef(new THREE.Vector3(0, 0, 6.2))
  const targetLookAt = useRef(new THREE.Vector3(0, 0, 0))
  const currentLookAt = useRef(new THREE.Vector3(0, 0, 0))

  useFrame(({ clock }) => {
    const isTouch = sceneMotionState.isTouch
    const pointer = sceneMotionState.pointer
    const scroll = sceneMotionState.scrollProgress
    const about = sceneMotionState.aboutProgress

    if (reducedMotion) {
      // Static camera with simple scroll offset only
      targetCameraPos.current.set(0, -scroll * 1.2 - about * 0.8, 6.2)
      targetLookAt.current.set(0, -scroll * 0.6 - about * 0.5, 0)
    } else if (isTouch) {
      // Gentle ambient floating drift for touch devices
      const t = clock.getElapsedTime()
      const driftX = Math.sin(t * 0.4) * 0.12
      const driftY = Math.cos(t * 0.3) * 0.08
      targetCameraPos.current.set(driftX, driftY - scroll * 1.2 - about * 0.8, 6.2)
      targetLookAt.current.set(0, -scroll * 0.6 - about * 0.5, 0)
    } else {
      // Desktop fine-pointer damped parallax with smooth About section alignment
      const targetX = pointer.x * 0.45 + (about * 0.3)
      const targetY = pointer.y * 0.3 - (scroll * 1.2) - (about * 0.9)
      const targetZ = 6.2 + Math.abs(pointer.x * 0.2)

      targetCameraPos.current.set(targetX, targetY, targetZ)
      targetLookAt.current.set(pointer.x * 0.15 + (about * 0.2), -scroll * 0.6 - (about * 0.5) + pointer.y * 0.08, 0)
    }

    // Damped smooth interpolation
    camera.position.lerp(targetCameraPos.current, 0.045)
    currentLookAt.current.lerp(targetLookAt.current, 0.045)
    camera.lookAt(currentLookAt.current)
  })

  return null
}
