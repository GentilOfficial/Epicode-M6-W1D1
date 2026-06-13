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
      </Form>
    </Container>
  )
}

export default Login
