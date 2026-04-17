import { Container } from './Container'

const GITHUB_URL = 'https://github.com/'

export function Footer() {
  return (
    <footer className="footer">
      <Container className="footer__inner">
        <div className="footer__left">
          <div className="footer__brand">Mood2Food API</div>
          <div className="footer__muted">
            AI-powered mood-based food recommendations.
          </div>
        </div>
        <div className="footer__right">
          <a className="link" href={GITHUB_URL} target="_blank" rel="noreferrer">
            GitHub
          </a>
          <a
            className="link"
            href="https://mood2food-api.onrender.com/redoc"
            target="_blank"
            rel="noreferrer"
          >
            OpenAPI
          </a>
        </div>
      </Container>
    </footer>
  )
}
