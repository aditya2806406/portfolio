import { gsap, ScrollTrigger } from '@/animations/gsap'
import { sceneMotionState } from '@/animations/sceneStore'

export function initScrollStory(): () => void {
  if (typeof window === 'undefined') return () => {}

  // Create GSAP context for safe cleanup
  const ctx = gsap.context(() => {
    // Hero to About section 3D spatial scrub transition
    ScrollTrigger.create({
      trigger: '#home',
      start: 'top top',
      end: 'bottom top',
      scrub: 1.2,
      onUpdate: (self) => {
        // Scrub numeric progress from 0 (top of hero) to 1 (passed hero into about)
        sceneMotionState.scrollProgress = self.progress
      },
    })

    // About section spatial progression across observatory perspective
    ScrollTrigger.create({
      trigger: '#about',
      start: 'top bottom',
      end: 'bottom top',
      scrub: 1.2,
      onUpdate: (self) => {
        sceneMotionState.aboutProgress = self.progress
      },
    })

    // Scroll progress bar indicator across the entire page
    ScrollTrigger.create({
      trigger: '#main-content',
      start: 'top top',
      end: 'bottom bottom',
      onUpdate: (self) => {
        const progressBar = document.getElementById('global-scroll-progress')
        if (progressBar) {
          progressBar.style.transform = `scaleX(${self.progress})`
        }
      },
    })
  })

  // Resize handler
  const handleResize = () => {
    ScrollTrigger.refresh()
  }
  window.addEventListener('resize', handleResize, { passive: true })

  // Return cleanup function
  return () => {
    window.removeEventListener('resize', handleResize)
    ctx.revert()
  }
}
