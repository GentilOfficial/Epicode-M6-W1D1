import { useContext, useState } from 'react'
import { Alert, Button, Container, Form, Spinner } from 'react-bootstrap'
import { useNavigate } from 'react-router'
import { AuthContext } from '../../providers/AuthenticationProvider'
import './styles.css'

const initialFormState = {
  name: '',
  surname: '',
  email: '',
  password: '',
  birthday: '',
}

const Signup = () => {
  const navigate = useNavigate()
  const { login } = useContext(AuthContext)

  const [form, setForm] = useState(initialFormState)
  const [avatarFile, setAvatarFile] = useState(null)

  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const onInputChange = (e) => {
    const { name, value } = e.target

    setForm({
      ...form,
      [name]: value,
    })
  }

  const handleAvatarChange = (e) => {
    setAvatarFile(e.target.files[0] || null)
  }

  const trySignup = async () => {
    setError('')
    setLoading(true)

    try {
      const response = await fetch(`${import.meta.env.VITE_API_SERVER}/authors`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(form),
      })

      if (!response.ok) {
        throw new Error('Errore durante la registrazione')
      }

      const { author, token } = await response.json()

      if (avatarFile) {
        const formData = new FormData()
        formData.append('avatar', avatarFile)

        const uploadResponse = await fetch(`${import.meta.env.VITE_API_SERVER}/authors/${author._id}/avatar`, {
          method: 'PUT',
          headers: {
            Authorization: token,
          },
          body: formData,
        })

        if (!uploadResponse.ok) {
          throw new Error("Errore durante l'upload dell'avatar")
        }
      }

      if (!login(token)) {
        throw new Error()
      }
    } catch (err) {
      setError('Si è verificato un errore')
    } finally {
      setLoading(false)
    }
  }

  const onFormSubmit = (e) => {
    e.preventDefault()
    trySignup()
  }

  return (
    <Container fluid="sm">
      <h1 className="blog-main-title mb-3">Registrati a Strive Blog!</h1>

      <Form className="form-container" onSubmit={onFormSubmit}>
        {error && <Alert variant="danger">{error}</Alert>}

        <Form.Group>
          <Form.Label>Nome</Form.Label>
          <Form.Control name="name" type="text" value={form.name} required onChange={onInputChange} />
        </Form.Group>

        <Form.Group className="mt-3">
          <Form.Label>Cognome</Form.Label>
          <Form.Control name="surname" type="text" value={form.surname} required onChange={onInputChange} />
        </Form.Group>

        <Form.Group className="mt-3">
          <Form.Label>Email</Form.Label>
          <Form.Control name="email" type="email" value={form.email} required onChange={onInputChange} />
        </Form.Group>

        <Form.Group className="mt-3">
          <Form.Label>Data di nascita</Form.Label>
          <Form.Control name="birthday" type="date" value={form.birthday} required onChange={onInputChange} />
        </Form.Group>

        <Form.Group className="mt-3">
          <Form.Label>Password</Form.Label>
          <Form.Control name="password" type="password" value={form.password} required onChange={onInputChange} />
        </Form.Group>

        <Form.Group className="mt-3">
          <Form.Label>Avatar</Form.Label>
          <Form.Control type="file" accept="image/*" onChange={handleAvatarChange} />
        </Form.Group>

        <Button type="submit" className="mt-3 w-100 submit-button" disabled={loading}>
          {loading ? (
            <>
              <Spinner animation="border" size="sm" className="me-2" />
              Registrazione...
            </>
          ) : (
            'Registrati'
          )}
        </Button>
      </Form>
    </Container>
  )
}

export default Signup
