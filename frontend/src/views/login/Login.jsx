import { useContext, useState } from 'react'
import { Button, Container, Form } from 'react-bootstrap'
import { useNavigate } from 'react-router'
import { AuthContext } from '../../providers/AuthenticationProvider'
import './styles.css'

const Home = (props) => {
  const { isAuthenticated, login } = useContext(AuthContext)
  const navigate = useNavigate()
  const [form, setForm] = useState({
    email: null,
    password: null,
  })

  const tryLogin = async () => {
    try {
      const rawResponse = await fetch(`${import.meta.env.VITE_API_SERVER}/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(form),
      })

      const response = await rawResponse.json()

      if (!response.token) {
        throw new Error('Invalid credentials')
      }

      login(response.token)
    } catch (e) {
      console.error(e)
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
        <Form.Group>
          <Form.Label>Email</Form.Label>
          <Form.Control name="email" type="text" required onChange={onInputChange} />
        </Form.Group>
        <Form.Group className="mt-3">
          <Form.Label>Password</Form.Label>
          <Form.Control name="password" type="password" required onChange={onInputChange} />
        </Form.Group>
        <Button type="submit" className="mt-3 w-100 submit-button">
          Accedi
        </Button>
      </Form>
    </Container>
  )
}

export default Home
