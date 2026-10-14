import React, { useState, useEffect, Component, type ErrorInfo, type ReactNode } from 'react'
import { Canvas } from '@react-three/fiber'
import { WorldEnvironment } from './WorldEnvironment'
import { SculpturalCenterpiece } from './SculpturalCenterpiece'
import { FloatingGeometry } from './FloatingGeometry'
import { StarfieldParticles } from './StarfieldParticles'
import { HorizonGrid } from './HorizonGrid'
import { CameraController } from './CameraController'
import { useReducedMotion } from '@/hooks/useReducedMotion'

interface ErrorBoundaryProps {
  children: ReactNode
  fallback: ReactNode
}

interface ErrorBoundaryState {
  hasError: boolean
}

class CanvasErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError(): ErrorBoundaryState {
    return { hasError: true }
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.warn('ExperienceCanvas WebGL Error:', error, errorInfo)
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback
    }
    return this.props.children
  }
}

export interface ExperienceCanvasProps {
  className?: string
}

export const ExperienceCanvas: React.FC<ExperienceCanvasProps> = ({ className = '' }) => {
  const reducedMotion = useReducedMotion()
  const [hasWebGL, setHasWebGL] = useState<boolean>(true)

  useEffect(() => {
    try {
      const testCanvas = document.createElement('canvas')
      const gl = testCanvas.getContext('webgl2') || testCanvas.getContext('webgl')
      if (!gl) {
        setHasWebGL(false)
      }
    } catch {
      setHasWebGL(false)
    }
  }, [])

  // Graceful CSS visual fallback if WebGL is unavailable
  const fallbackUI = (
    <div
      aria-hidden="true"
      className="fixed inset-0 pointer-events-none z-0 overflow-hidden bg-[#080A10]"
    >
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[600px] rounded-full radial-glow-cyan opacity-40 blur-3xl" />
      <div className="absolute top-1/3 left-1/3 w-[500px] h-[500px] rounded-full radial-glow-violet opacity-30 blur-3xl" />
      <div className="absolute inset-0 architectural-grid opacity-20" />
    </div>
  )

  if (!hasWebGL) {
    return fallbackUI
  }

  return (
    <div
      aria-hidden="true"
      className={`fixed inset-0 pointer-events-none z-0 overflow-hidden bg-[#080A10] ${className}`}
    >
      <CanvasErrorBoundary fallback={fallbackUI}>
        <Canvas
          camera={{ position: [0, 0, 6.2], fov: 45 }}
          gl={{
            antialias: true,
            alpha: true,
            powerPreference: 'high-performance',
            depth: true,
          }}
          dpr={[1, 1.5]}
        >
          <WorldEnvironment />
          <CameraController reducedMotion={reducedMotion} />
          <HorizonGrid />
          <StarfieldParticles count={260} reducedMotion={reducedMotion} />
          <FloatingGeometry reducedMotion={reducedMotion} />
          <SculpturalCenterpiece reducedMotion={reducedMotion} />
        </Canvas>
      </CanvasErrorBoundary>
    </div>
  )
}
