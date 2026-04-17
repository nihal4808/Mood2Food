export const API_BASE_URL = 'https://mood2food-api.onrender.com'

export async function recommendFood(
  { moodText, timeOfDay, dietType },
  { signal } = {},
) {
  const res = await fetch(`${API_BASE_URL}/recommend`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      mood_text: moodText,
      time_of_day: timeOfDay,
      diet_type: dietType,
    }),
    signal,
  })

  let data = null
  try {
    data = await res.json()
  } catch {
    // ignore JSON parse failures
  }

  if (!res.ok) {
    const message =
      (data && (data.detail || data.message)) ||
      `Request failed (HTTP ${res.status})`
    const err = new Error(
      typeof message === 'string' ? message : `Request failed (HTTP ${res.status})`,
    )
    err.status = res.status
    err.data = data
    throw err
  }

  return data
}
