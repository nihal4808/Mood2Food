import { Container } from '../components/Container'
import { CodeBlock } from '../components/CodeBlock'
import { LiveDemoWidget } from '../components/LiveDemoWidget'
import { Section } from '../components/Section'

const curlExample = `curl -X POST https://mood2food-api.onrender.com/recommend \
  -H "Content-Type: application/json" \
  -d '{
    "mood_text": "I feel stressed and tired",
    "time_of_day": "dinner",
    "diet_type": "veg"
  }'`

const pythonExample = `import requests

url = "https://mood2food-api.onrender.com/recommend"
payload = {
  "mood_text": "I feel stressed and tired",
  "time_of_day": "dinner",
  "diet_type": "veg",
}

r = requests.post(url, json=payload)
r.raise_for_status()
print(r.json())`

const jsExample = `const res = await fetch("https://mood2food-api.onrender.com/recommend", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({
    mood_text: "I feel stressed and tired",
    time_of_day: "dinner",
    diet_type: "veg",
  }),
});

if (!res.ok) throw new Error("Request failed");
const data = await res.json();
console.log(data);`

export function DocsPage() {
  return (
    <Container className="page">
      <div className="page__top">
        <h1 className="h1 h1--sm">API Docs</h1>
        <p className="lead">
          One endpoint. Mood in, food + nutrition out.
        </p>
      </div>

      <Section eyebrow="Endpoint" title="POST /recommend" className="section--tight">
        <div className="card">
          <div className="kv">
            <div className="kv__k">Base URL</div>
            <div className="kv__v">https://mood2food-api.onrender.com</div>
          </div>
          <div className="kv">
            <div className="kv__k">Method</div>
            <div className="kv__v">POST</div>
          </div>
          <div className="kv">
            <div className="kv__k">Path</div>
            <div className="kv__v">/recommend</div>
          </div>
          <div className="kv">
            <div className="kv__k">Content-Type</div>
            <div className="kv__v">application/json</div>
          </div>
        </div>
      </Section>

      <Section eyebrow="Request" title="JSON body">
        <div className="table">
          <div className="table__row table__head">
            <div>Field</div>
            <div>Type</div>
            <div>Description</div>
          </div>
          <div className="table__row">
            <div className="mono">mood_text</div>
            <div className="mono">string</div>
            <div>User’s natural-language mood description.</div>
          </div>
          <div className="table__row">
            <div className="mono">time_of_day</div>
            <div className="mono">string</div>
            <div>Meal window (e.g., breakfast, lunch, snack, dinner).</div>
          </div>
          <div className="table__row">
            <div className="mono">diet_type</div>
            <div className="mono">string</div>
            <div>Diet preference (veg, nonveg, vegan).</div>
          </div>
        </div>
      </Section>

      <Section eyebrow="Response" title="Recommendation payload">
        <p className="muted">
          Example response fields observed from the live API:
        </p>
        <div className="table">
          <div className="table__row table__head">
            <div>Field</div>
            <div>Type</div>
            <div>Description</div>
          </div>
          <div className="table__row">
            <div className="mono">detected_emotion</div>
            <div className="mono">object</div>
            <div>
              Emotion classification result (includes <span className="mono">emotion</span>{' '}
              and <span className="mono">confidence</span>).
            </div>
          </div>
          <div className="table__row">
            <div className="mono">recommended_food</div>
            <div className="mono">object</div>
            <div>
              Dish metadata (food name, cuisine, diet type, meal time, nutrients).
            </div>
          </div>
          <div className="table__row">
            <div className="mono">why_it_fits</div>
            <div className="mono">string</div>
            <div>Natural-language explanation of the match.</div>
          </div>
          <div className="table__row">
            <div className="mono">mood_match_score</div>
            <div className="mono">number</div>
            <div>Similarity score between mood and recommended dish.</div>
          </div>
          <div className="table__row">
            <div className="mono">nutrition_summary</div>
            <div className="mono">object</div>
            <div>
              Calories + macros and source info (e.g., USDA).
            </div>
          </div>
        </div>
      </Section>

      <Section eyebrow="Examples" title="Copy-paste snippets">
        <div className="grid2">
          <CodeBlock language="curl" code={curlExample} />
          <CodeBlock language="python" code={pythonExample} />
          <CodeBlock language="javascript" code={jsExample} />
        </div>
      </Section>

      <Section id="try" eyebrow="Try it" title="Live request">
        <LiveDemoWidget />
      </Section>
    </Container>
  )
}
