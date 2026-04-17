import { useEffect, useRef, useState } from 'react'

export function useRevealOnScroll({ rootMargin = '0px 0px -10% 0px' } = {}) {
  const ref = useRef(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const obs = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setIsVisible(true)
            obs.disconnect()
            break
          }
        }
      },
      { root: null, threshold: 0.15, rootMargin },
    )

    obs.observe(el)
    return () => obs.disconnect()
  }, [rootMargin])

  return { ref, isVisible }
}
