import { useEffect, useState } from 'react'

export function useDelayedFlag(active, delayMs) {
  const [flag, setFlag] = useState(false)

  useEffect(() => {
    if (!active) {
      const t = window.setTimeout(() => setFlag(false), 0)
      return () => window.clearTimeout(t)
    }

    const t = window.setTimeout(() => setFlag(true), delayMs)
    return () => window.clearTimeout(t)
  }, [active, delayMs])

  return flag
}
