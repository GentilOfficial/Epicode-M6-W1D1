import { useContext } from 'react'
import { Button, Container, Dropdown, Image, Nav, Navbar } from 'react-bootstrap'
import { Link } from 'react-router'
import logo from '../../assets/logo.png'
import { AuthContext } from '../../providers/AuthenticationProvider'
import './styles.css'

const NavBar = () => {
  const { user, isAuthenticated, logout } = useContext(AuthContext)

  return (
    <Navbar expand="lg" className="blog-navbar" fixed="top">
      <Container>
        <Navbar.Brand as={Link} to="/">
          <img className="blog-navbar-brand" alt="logo" src={logo} />
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="navbar-content" />

        <Navbar.Collapse id="navbar-content" className="mt-lg-0 mt-3">
          <Nav className="ms-auto align-items-lg-center gap-2">
            {isAuthenticated && user && (
              <>
                <Button as={Link} to="/new" className="blog-navbar-button" size="md" variant="dark">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    className="bi bi-plus-lg"
                    viewBox="0 0 16 16"
                  >
                    <path d="M8 0a1 1 0 0 1 1 1v6h6a1 1 0 1 1 0 2H9v6a1 1 0 1 1-2 0V9H1a1 1 0 0 1 0-2h6V1a1 1 0 0 1 1-1z" />
                  </svg>
                  Nuovo Articolo
                </Button>

                <Dropdown align="end">
                  <Dropdown.Toggle variant="light" id="user-dropdown" className="blog-navbar-button w-100">
                    <Image src={user.avatar} roundedCircle width={32} height={32} alt="avatar" />
                    <span className="ms-auto">{user.name}</span>
                  </Dropdown.Toggle>

                  <Dropdown.Menu className="p-2" style={{ minWidth: 260 }}>
                    <div className="px-2 py-2">
                      <div className="fw-bold">
                        {user.name} {user.surname}
                      </div>
                      <div className="text-muted small">{user.email}</div>
                    </div>

                    <Dropdown.Divider />

                    <Dropdown.Item onClick={logout} className="text-danger">
                      Logout
                    </Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              </>
            )}

            {!isAuthenticated && (
              <>
                <Button as={Link} to="/login" className="blog-navbar-button" variant="dark">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M3 19V5" /> <path d="m13 6-6 6 6 6" /> <path d="M7 12h14" />
                  </svg>
                  Accedi
                </Button>
                <Button as={Link} to="/signup" className="blog-navbar-button" variant="dark">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" /> <circle cx="9" cy="7" r="4" />
                    <line x1="19" x2="19" y1="8" y2="14" /> <line x1="22" x2="16" y1="11" y2="11" />
                  </svg>
                  Registrati
                </Button>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}

export default NavBar
