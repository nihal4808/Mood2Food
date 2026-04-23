import { useMemo, useState } from 'react'
import { v4 as uuidv4 } from 'uuid'
import { Container } from '../components/Container'
import { CodeBlock } from '../components/CodeBlock'
import { Section } from '../components/Section'

const USE_CASES = [
  { value: 'food-delivery', label: 'Food delivery app' },
  { value: 'health', label: 'Health / fitness app' },
  { value: 'wellness', label: 'Corporate wellness' },
  { value: 'other', label: 'Other' },
]

const PLANS = [
  { value: 'free', label: 'Free (100 calls/day)' },
  { value: 'startup', label: 'Startup (₹4,999/month — 10,000 calls/day)' },
  { value: 'enterprise', label: 'Enterprise (custom)' },
]

function generateKey() {
  if (typeof crypto !== 'undefined' && crypto.randomUUID) return crypto.randomUUID()
  return uuidv4()
}

export function GetKeyPage() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [useCase, setUseCase] = useState(USE_CASES[0].value)
  const [plan, setPlan] = useState(PLANS[0].value)

  const [key, setKey] = useState('')
  const [copied, setCopied] = useState(false)

  const canSubmit = useMemo(() => {
    if (!name.trim()) return false
    if (!email.trim()) return false
    return true
  }, [name, email])

  async function copyKey() {
    try {
      await navigator.clipboard.writeText(key)
      setCopied(true)
      window.setTimeout(() => setCopied(false), 1200)
    } catch {
      // ignore
    }
  }

  function onSubmit(e) {
    e.preventDefault()
    setCopied(false)
    setKey(generateKey())
  }

  const usageCurl = `curl -X POST https://mood2food-api.onrender.com/recommend \\
  -H "Content-Type: application/json" \\
  -d '{
    "mood_text": "I feel happy today",
    "time_of_day": "lunch",
    "diet_type": "veg"
  }'`

  const usageJs = `await fetch("https://mood2food-api.onrender.com/recommend", {
  method: "POST",
  headers: {
    "Content-Type": "application/json"
  },
  body: JSON.stringify({
    mood_text: "I feel happy today",
    time_of_day: "lunch",
    diet_type: "veg",
  }),
});`

  return (
    <Container className="page">
      <div className="page__top">
        <h1 className="h1 h1--sm">Get an API Key</h1>
        <p className="lead">
          Instant key generation for development (frontend-only for now).
        </p>
      </div>

      <Section eyebrow="Request a key" title="Tell us about your app" className="section--tight">
        <form className="card form" onSubmit={onSubmit}>
          <div className="grid2">
            <label className="field">
              <span className="field__label">Name</span>
              <input
                className="input"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Your name"
              />
            </label>
            <label className="field">
              <span className="field__label">Email</span>
              <input
                className="input"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@company.com"
                type="email"
              />
            </label>
            <label className="field">
              <span className="field__label">Use case</span>
              <select
                className="input"
                value={useCase}
                onChange={(e) => setUseCase(e.target.value)}
              >
                {USE_CASES.map((o) => (
                  <option key={o.value} value={o.value}>
                    {o.label}
                  </option>
                ))}
              </select>
            </label>
            <label className="field">
              <span className="field__label">Plan</span>
              <select
                className="input"
                value={plan}
                onChange={(e) => setPlan(e.target.value)}
              >
                {PLANS.map((o) => (
                  <option key={o.value} value={o.value}>
                    {o.label}
                  </option>
                ))}
              </select>
            </label>
          </div>

          <div className="form__actions">
            <button className="btn" type="submit" disabled={!canSubmit}>
              Generate key
            </button>
            <div className="muted">
              API keys are currently in open beta. Rate limiting and authentication
              will be enforced in the production release.
            </div>
          </div>
        </form>
      </Section>

      {key ? (
        <Section eyebrow="Your key" title="Copy and save it">
          <div className="card">
            <div className="keyline">
              <div className="keyline__value mono">{key}</div>
              <button type="button" className="btn btn--small" onClick={copyKey}>
                {copied ? 'Copied' : 'Copy'}
              </button>
            </div>
            <div className="muted">
              Save this key — it will be required for all requests once authentication
              is enabled.
            </div>
          </div>
        </Section>
      ) : null}

      <Section eyebrow="Usage" title="Send the key in headers">
        <div className="grid2">
          <CodeBlock language="curl" code={usageCurl} />
          <CodeBlock language="javascript" code={usageJs} />
        </div>
        <div className="alert alert--info">
          API keys will be used for authentication and rate limiting in the
          production release. Save your key for future use.
        </div>
        <div className="muted">Selected: {useCase} • {plan}</div>
      </Section>
    </Container>
  )
}
