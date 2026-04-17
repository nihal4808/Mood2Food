import { useRevealOnScroll } from '../hooks/useRevealOnScroll'

export function Section({ id, eyebrow, title, children, className = '' }) {
  const { ref, isVisible } = useRevealOnScroll()

  return (
    <section
      id={id}
      ref={ref}
      className={`section reveal ${isVisible ? 'reveal--visible' : ''} ${className}`}
    >
      {eyebrow ? <div className="eyebrow">{eyebrow}</div> : null}
      {title ? <h2 className="section__title">{title}</h2> : null}
      {children}
    </section>
  )
}
