import { useContext, useState } from 'react'
import { Alert, Button, Container, Form, Spinner } from 'react-bootstrap'
import { useNavigate } from 'react-router'
import { AuthContext } from '../../providers/AuthenticationProvider'
import './styles.css'

const Login = () => {
  const { login } = useContext(AuthContext)
  const navigate = useNavigate()

  const [form, setForm] = useState({
    email: '',
    password: '',
  })

  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const tryLogin = async () => {
    setError('')
    setLoading(true)

    try {
      const rawResponse = await fetch(`${import.meta.env.VITE_API_SERVER}/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(form),
      })

      const response = await rawResponse.json()

      if (rawResponse.status === 401) {
        throw new Error('Credenziali non valide')
      }

      if (!rawResponse.ok) {
        throw new Error(response.message)
      }

      if (!login(response.token)) {
        throw new Error()
      }
    } catch (err) {
      setError(err.message || 'Si è verificato un errore')
    } finally {
      setForm({ ...form, password: '' })
      setLoading(false)
    }
  }

  const onInputChange = (e) => {
    const { name, value } = e.target

    setForm({
      ...form,
      [name]: value,
    })
  }

  const onFormSubmit = (e) => {
    e.preventDefault()
    tryLogin()
  }

  const redirectToGoogleLogin = () => {
    window.location.href = `${import.meta.env.VITE_API_SERVER}/login/google`
  }

  return (
    <Container fluid="sm">
      <h1 className="blog-main-title mb-3">Accedi a Strive Blog!</h1>

      <Form className="form-container" onSubmit={onFormSubmit}>
        {error && <Alert variant="danger">{error}</Alert>}
        <Form.Group>
          <Form.Label>Email</Form.Label>
          <Form.Control name="email" type="email" value={form.email} required onChange={onInputChange} />
        </Form.Group>

        <Form.Group className="mt-3">
          <Form.Label>Password</Form.Label>
          <Form.Control name="password" type="password" value={form.password} required onChange={onInputChange} />
        </Form.Group>

        <Button type="submit" className="mt-3 w-100 submit-button" disabled={loading}>
          {loading ? (
            <>
              <Spinner animation="border" size="sm" className="me-2" />
              Accesso in corso...
            </>
          ) : (
            'Accedi'
          )}
        </Button>
        <div className="my-3 d-flex gap-3 align-items-center justify-content-center">
          <hr className="w-100" />
          <span>oppure</span>
          <hr className="w-100" />
        </div>
        <Button
          className="w-100 border d-flex align-items-center justify-content-center gap-2"
          variant="light"
          onClick={redirectToGoogleLogin}
        >
          <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" width="24">
            <path
              d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              fill="#4285F4"
            />
            <path
              d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              fill="#34A853"
            />
            <path
              d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
              fill="#FBBC05"
            />
            <path
              d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
              fill="#EA4335"
            />
            <path d="M1 1h22v22H1z" fill="none" />
          </svg>
          <span>Accedi con Google</span>
        </Button>
      </Form>
    </Container>
  )
}

export default Login
