import { Container } from '../components/Container'
import { LiveDemoWidget } from '../components/LiveDemoWidget'
import { PricingCards } from '../components/PricingCards'
import { Section } from '../components/Section'

export function LandingPage() {
  return (
    <>
      <div className="hero">
        <Container className="hero__inner">
          <div className="hero__copy">
            <div className="eyebrow">Mood2Food AI API</div>
            <h1 className="h1">AI-Powered Mood-Based Food Recommendations</h1>
            <p className="lead">
              Integrate emotion-aware food suggestions into your app with one API
              call.
            </p>

            <div className="hero__actions">
              <a className="btn" href="/docs">
                Read docs
              </a>
              <a className="btn btn--ghost" href="#pricing">
                View pricing
              </a>
            </div>

            <div className="hero__meta">
              <span className="pill">Dark-mode first</span>
              <span className="pill">Fetch-based</span>
              <span className="pill">Live API</span>
            </div>
          </div>

          <div className="hero__demo">
            <LiveDemoWidget />
          </div>
        </Container>
      </div>

      <Container>
        <Section
          eyebrow="How it works"
          title="From mood to meal in 3 steps"
          className="section--tight"
        >
          <div className="steps">
            <div className="card step">
              <div className="step__num">1</div>
              <div className="step__title">Detect Mood</div>
              <div className="muted">
                Your users write how they feel in natural language.
              </div>
            </div>
            <div className="card step">
              <div className="step__num">2</div>
              <div className="step__title">Match Food</div>
              <div className="muted">
                We classify emotion and select a diet-aware dish.
              </div>
            </div>
            <div className="card step">
              <div className="step__num">3</div>
              <div className="step__title">Return Nutrition</div>
              <div className="muted">
                Get calories + macros with a clear “why it fits”.
              </div>
            </div>
          </div>
        </Section>

        <Section eyebrow="Use cases" title="Built for real products">
          <div className="grid3">
            <div className="card">
              <div className="card__title">Food delivery apps</div>
              <div className="muted">
                Personalize the feed using emotional context, not just cuisine.
              </div>
            </div>
            <div className="card">
              <div className="card__title">Health & fitness</div>
              <div className="muted">
                Suggest mood-safe meals with nutrition summaries.
              </div>
            </div>
            <div className="card">
              <div className="card__title">Corporate wellness</div>
              <div className="muted">
                Build snack recommendations that fit stress + schedule.
              </div>
            </div>
          </div>
        </Section>

        <Section id="pricing" eyebrow="Pricing" title="Simple, transparent plans">
          <PricingCards />
        </Section>
      </Container>
    </>
  )
}
