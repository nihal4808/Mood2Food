import { useMemo } from 'react'

function detectTimeOfDay(date = new Date()) {
  const hour = date.getHours()

  if (hour >= 5 && hour <= 10) return 'breakfast'
  if (hour >= 11 && hour <= 15) return 'lunch'
  if (hour >= 16 && hour <= 18) return 'snack'
  if (hour >= 19 && hour <= 22) return 'dinner'
  return 'late_night'
}

export function useTimeOfDay() {
  return useMemo(() => detectTimeOfDay(), [])
}
