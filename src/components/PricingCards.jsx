const PLANS = [
  {
    name: 'Free',
    price: '₹0',
    desc: 'For prototypes and small demos',
    bullets: ['100 calls/day', 'Community support', 'No credit card'],
  },
  {
    name: 'Startup',
    price: '₹4,999/month',
    desc: 'For production apps getting traction',
    highlight: true,
    bullets: ['10,000 calls/day', 'Email support', 'Higher rate limits'],
  },
  {
    name: 'Enterprise',
    price: 'Custom',
    desc: 'For teams with advanced needs',
    bullets: ['Custom limits', 'SLA & compliance', 'Dedicated support'],
  },
]

export function PricingCards() {
  return (
    <div className="pricing">
      {PLANS.map((p) => (
        <div
          key={p.name}
          className={`card pricing__card ${p.highlight ? 'pricing__card--hot' : ''}`}
        >
          <div className="pricing__top">
            <div className="pricing__name">{p.name}</div>
            <div className="pricing__price">{p.price}</div>
            <div className="muted">{p.desc}</div>
          </div>
          <ul className="pricing__list">
            {p.bullets.map((b) => (
              <li key={b}>{b}</li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  )
}
