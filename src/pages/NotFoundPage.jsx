import { Link } from 'react-router-dom'
import { Container } from '../components/Container'

export function NotFoundPage() {
  return (
    <Container className="page">
      <div className="page__top">
        <h1 className="h1 h1--sm">404</h1>
        <p className="lead">That page doesn’t exist.</p>
      </div>
      <Link className="btn" to="/">
        Back to home
      </Link>
    </Container>
  )
}
