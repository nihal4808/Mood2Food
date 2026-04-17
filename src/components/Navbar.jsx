import { NavLink, Link } from 'react-router-dom'
import { Container } from './Container'

export function Navbar() {
  return (
    <header className="navbar">
      <Container className="navbar__inner">
        <Link to="/" className="navbar__brand">
          <span className="navbar__logo" aria-hidden="true">
            M2F
          </span>
          <span>Mood2Food</span>
        </Link>

        <nav className="navbar__nav" aria-label="Primary">
          <NavLink
            to="/docs"
            className={({ isActive }) =>
              `navlink ${isActive ? 'navlink--active' : ''}`
            }
          >
            Docs
          </NavLink>
          <NavLink
            to="/get-key"
            className={({ isActive }) =>
              `navlink ${isActive ? 'navlink--active' : ''}`
            }
          >
            Get API Key
          </NavLink>
        </nav>

        <div className="navbar__cta">
          <a className="btn btn--ghost" href="/docs#try">
            Try it
          </a>
          <Link className="btn" to="/get-key">
            Get key
          </Link>
        </div>
      </Container>
    </header>
  )
}
