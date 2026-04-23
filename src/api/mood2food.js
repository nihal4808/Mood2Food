export const API_BASE_URL = 'https://mood2food-api.onrender.com'

function extractRemainingCalls(data) {
  const candidates = [
    data?.remaining_calls_today,
    data?.remaining_calls,
    data?.calls_remaining,
    data?.remaining,
    data?.rate_limit_remaining,
  ]

  for (const value of candidates) {
    if (typeof value === 'number' && Number.isFinite(value)) return value
  }

  return null
}

export async function validateApiKey(apiKey, { signal } = {}) {
  const res = await fetch(`${API_BASE_URL}/validate-key`, {
    method: 'GET',
    headers: {
      'X-API-Key': apiKey,
    },
    signal,
  })

  let data = null
  try {
    data = await res.json()
  } catch {
    // ignore JSON parse failures
  }

  const remainingCalls = extractRemainingCalls(data)

  if (!res.ok) {
    return { valid: false, remainingCalls }
  }

  const validFlag =
    data?.valid ??
    data?.is_valid ??
    data?.ok ??
    (typeof data?.status === 'string' ? data.status.toLowerCase() === 'valid' : undefined)

  return {
    valid: validFlag === undefined ? true : Boolean(validFlag),
    remainingCalls,
  }
}

export async function recommendFood(
  { moodText, timeOfDay, dietType },
  { signal, apiKey } = {},
) {
  const res = await fetch(`${API_BASE_URL}/recommend`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      ...(apiKey ? { 'X-API-Key': apiKey } : null),
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
