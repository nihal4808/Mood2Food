import { useEffect, useMemo, useRef, useState } from 'react'
import { recommendFood } from '../api/mood2food'
import { useTimeOfDay } from '../hooks/useTimeOfDay'
import { useDelayedFlag } from '../hooks/useDelayedFlag'

const DIET_OPTIONS = [
  { value: 'veg', label: 'Vegetarian' },
  { value: 'nonveg', label: 'Non-veg' },
  { value: 'vegan', label: 'Vegan' },
]

function formatScore(score) {
  if (typeof score !== 'number' || Number.isNaN(score)) return null
  const clamped = Math.max(0, Math.min(1, score))
  return `${Math.round(clamped * 100)}%`
}

function DishIllustration({ title = 'Dish' }) {
  return (
    <svg
      className="dishSvg"
      viewBox="0 0 420 240"
      role="img"
      aria-label={`${title} illustration`}
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id="m2fGlow" x1="0" x2="1" y1="0" y2="1">
          <stop offset="0" stopColor="rgba(255, 107, 53, 0.55)" />
          <stop offset="1" stopColor="rgba(255, 255, 255, 0.05)" />
        </linearGradient>
        <linearGradient id="m2fPlate" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0" stopColor="rgba(255,255,255,0.10)" />
          <stop offset="1" stopColor="rgba(255,255,255,0.02)" />
        </linearGradient>
      </defs>

      <rect x="14" y="14" width="392" height="212" rx="26" fill="url(#m2fGlow)" />

      <g opacity="0.85">
        <circle cx="210" cy="130" r="78" fill="url(#m2fPlate)" />
        <circle cx="210" cy="130" r="54" fill="rgba(0,0,0,0.18)" />
        <circle cx="210" cy="130" r="34" fill="rgba(255,107,53,0.22)" />
      </g>

      <g opacity="0.9">
        <path
          d="M95 62c14 0 25 11 25 25v34c0 7-6 13-13 13h-24c-7 0-13-6-13-13V87c0-14 11-25 25-25z"
          fill="rgba(255,255,255,0.08)"
        />
        <rect x="86" y="70" width="7" height="60" rx="3" fill="rgba(255,255,255,0.12)" />
        <rect x="100" y="70" width="7" height="60" rx="3" fill="rgba(255,255,255,0.12)" />
        <rect x="114" y="70" width="7" height="60" rx="3" fill="rgba(255,255,255,0.12)" />
      </g>

      <g opacity="0.9">
        <rect x="322" y="62" width="16" height="104" rx="8" fill="rgba(255,255,255,0.10)" />
        <path
          d="M310 62h14c8 0 15 7 15 15v26c0 8-7 15-15 15h-14V62z"
          fill="rgba(255,255,255,0.06)"
        />
      </g>

      <text
        x="210"
        y="210"
        textAnchor="middle"
        fontFamily="ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace"
        fontSize="13"
        fill="rgba(255,255,255,0.70)"
      >
        {title}
      </text>
    </svg>
  )
}

function Chip({ children, tone = 'default' }) {
  return <span className={`chip chip--${tone}`}>{children}</span>
}

export function LiveDemoWidget({ compact = false }) {
  const timeOfDay = useTimeOfDay()

  const [moodText, setMoodText] = useState('')
  const [dietType, setDietType] = useState('veg')

  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [result, setResult] = useState(null)

  const showWaking = useDelayedFlag(loading, 5000)
  const abortRef = useRef(null)

  const canSubmit = useMemo(() => moodText.trim().length > 0 && !loading, [
    moodText,
    loading,
  ])

  const food = result?.recommended_food || null
  const emotion = result?.detected_emotion || null
  const nutrition = result?.nutrition_summary || null
  const matchScore = formatScore(result?.mood_match_score)

  useEffect(() => {
    return () => {
      if (abortRef.current) abortRef.current.abort()
    }
  }, [])

  async function onSubmit(e) {
    e.preventDefault()
    setError(null)
    setResult(null)

    if (abortRef.current) abortRef.current.abort()
    const controller = new AbortController()
    abortRef.current = controller

    const kill = window.setTimeout(() => controller.abort(), 75000)

    try {
      setLoading(true)
      const data = await recommendFood(
        {
          moodText: moodText.trim(),
          timeOfDay,
          dietType,
        },
        { signal: controller.signal },
      )
      setResult(data)
    } catch (err) {
      if (err?.name === 'AbortError') {
        setError('Request timed out. Please try again.')
      } else {
        setError(err?.message || 'Something went wrong')
      }
    } finally {
      window.clearTimeout(kill)
      setLoading(false)
    }
  }

  return (
    <div className={`demo card ${compact ? 'demo--compact' : ''}`}>
      <div className="demo__header">
        <div>
          <div className="demo__title">Live Demo</div>
          <div className="demo__muted">
            Time detected: <span className="pill">{timeOfDay}</span>
          </div>
        </div>
      </div>

      <form className="demo__form" onSubmit={onSubmit}>
        <label className="field">
          <span className="field__label">Mood</span>
          <input
            className="input"
            value={moodText}
            onChange={(e) => setMoodText(e.target.value)}
            placeholder="e.g., I'm anxious before an exam"
            autoComplete="off"
          />
        </label>

        <label className="field">
          <span className="field__label">Diet</span>
          <select
            className="input"
            value={dietType}
            onChange={(e) => setDietType(e.target.value)}
          >
            {DIET_OPTIONS.map((o) => (
              <option key={o.value} value={o.value}>
                {o.label}
              </option>
            ))}
          </select>
        </label>

        <button className="btn demo__btn" type="submit" disabled={!canSubmit}>
          {loading ? 'Requesting…' : 'Get recommendation'}
        </button>
      </form>

      {loading ? (
        <div className="demo__status" role="status" aria-live="polite">
          {showWaking ? (
            <div>
              <div className="demo__waking">Waking up AI model…</div>
              <div className="demo__muted">
                First request can take up to ~60 seconds.
              </div>
            </div>
          ) : (
            <div className="demo__muted">Talking to Mood2Food AI…</div>
          )}
        </div>
      ) : null}

      {error ? (
        <div className="alert" role="alert">
          {error}
        </div>
      ) : null}

      {result ? (
        <div className="demo__result">
          <div className="demoCard">
            <div className="demoCard__media" aria-hidden="true">
              <DishIllustration title={food?.food_name || 'Recommendation'} />
            </div>

            <div className="demoCard__body">
              <div className="demoCard__titleRow">
                <div className="demoCard__title">
                  {food?.food_name || 'Recommendation'}
                </div>
                {matchScore ? <Chip tone="primary">Match {matchScore}</Chip> : null}
              </div>

              <div className="demoCard__chips">
                {emotion?.emotion ? (
                  <Chip>Emotion: {emotion.emotion}</Chip>
                ) : null}
                {food?.cuisine ? <Chip>{food.cuisine}</Chip> : null}
                {food?.diet_type ? <Chip>{food.diet_type}</Chip> : null}
                {food?.meal_time ? <Chip>Meal: {food.meal_time}</Chip> : null}
                {food?.nutrients ? <Chip>Nutrients: {food.nutrients}</Chip> : null}
              </div>

              {result?.why_it_fits ? (
                <div className="demoCard__why">
                  <div className="demoCard__subtitle">Why it fits</div>
                  <div className="demoCard__whyText">{result.why_it_fits}</div>
                </div>
              ) : null}

              <div className="demoCard__nutrition">
                <div className="demoCard__subtitle">Nutrition</div>
                {nutrition?.available ? (
                  <div className="statGrid">
                    {typeof nutrition.calories === 'number' ? (
                      <div className="stat">
                        <div className="stat__k">Calories</div>
                        <div className="stat__v">{nutrition.calories}</div>
                      </div>
                    ) : null}
                    {typeof nutrition.protein === 'number' ? (
                      <div className="stat">
                        <div className="stat__k">Protein (g)</div>
                        <div className="stat__v">{nutrition.protein}</div>
                      </div>
                    ) : null}
                    {typeof nutrition.carbs === 'number' ? (
                      <div className="stat">
                        <div className="stat__k">Carbs (g)</div>
                        <div className="stat__v">{nutrition.carbs}</div>
                      </div>
                    ) : null}
                    {typeof nutrition.iron === 'number' ? (
                      <div className="stat">
                        <div className="stat__k">Iron (mg)</div>
                        <div className="stat__v">{nutrition.iron}</div>
                      </div>
                    ) : null}
                    {typeof nutrition.magnesium === 'number' ? (
                      <div className="stat">
                        <div className="stat__k">Magnesium (mg)</div>
                        <div className="stat__v">{nutrition.magnesium}</div>
                      </div>
                    ) : null}
                  </div>
                ) : (
                  <div className="muted">
                    Nutrition data not available for this recommendation.
                  </div>
                )}

                {nutrition?.source ? (
                  <div className="demoCard__source muted">
                    Source: <span className="mono">{nutrition.source}</span>
                    {nutrition?.usda_fdc_id ? (
                      <>
                        {' '}• FDC ID:{' '}
                        <span className="mono">{nutrition.usda_fdc_id}</span>
                      </>
                    ) : null}
                  </div>
                ) : null}
              </div>
            </div>
          </div>

          <details className="demo__raw">
            <summary>View raw JSON</summary>
            <pre className="json">
              <code>{JSON.stringify(result, null, 2)}</code>
            </pre>
          </details>
        </div>
      ) : null}
    </div>
  )
}
