export interface SceneMotionState {
  pointer: { x: number; y: number }
  targetPointer: { x: number; y: number }
  scrollProgress: number
  aboutProgress: number
  isTouch: boolean
}

export const sceneMotionState: SceneMotionState = {
  pointer: { x: 0, y: 0 },
  targetPointer: { x: 0, y: 0 },
  scrollProgress: 0,
  aboutProgress: 0,
  isTouch: false,
}

if (typeof window !== 'undefined') {
  // Check if touch device
  sceneMotionState.isTouch = !window.matchMedia('(hover: hover) and (pointer: fine)').matches

  const handlePointerMove = (e: MouseEvent) => {
    if (sceneMotionState.isTouch) return
    const nx = (e.clientX / window.innerWidth) * 2 - 1
    const ny = -(e.clientY / window.innerHeight) * 2 + 1
    sceneMotionState.targetPointer.x = Math.max(-1, Math.min(1, nx))
    sceneMotionState.targetPointer.y = Math.max(-1, Math.min(1, ny))
  }

  window.addEventListener('mousemove', handlePointerMove, { passive: true })
}
