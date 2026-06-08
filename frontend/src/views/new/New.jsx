import { useState } from 'react'
import { Alert, Button, Container, Form, InputGroup, Spinner } from 'react-bootstrap'
import Editor from '../../components/editor/Editor'
import './styles.css'

const initialFormState = {
  title: '',
  category: '',
  author: '',
  readTime: {
    value: 0,
    unit: 'sec',
  },
  content: '<h1>Titolo</h1><p>Inizia a scrivere il tuo post...</p>',
}

const NewBlogPost = () => {
  const [form, setForm] = useState(initialFormState)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const [coverFile, setCoverFile] = useState(null)

  const handleInputChange = (e) => {
    const { name, value } = e.target

    setForm({
      ...form,
      [name]: value,
    })
  }

  const handleReadTimeChange = (e) => {
    const { name, value } = e.target

    setForm({
      ...form,
      readTime: {
        ...form.readTime,
        [name]: name === 'value' ? Number(value) : value,
      },
    })
  }

  const handleEditorChange = (value) => {
    setForm({
      ...form,
      content: value,
    })
  }

  const handleCoverChange = (e) => {
    setCoverFile(e.target.files[0])
  }

  const resetMessages = () => {
    setError('')
    setSuccess('')
  }

  const validateForm = () => {
    if (!form.title.trim()) {
      return 'Il titolo è obbligatorio'
    }

    if (!form.category) {
      return 'Seleziona una categoria'
    }

    if (!form.author.trim()) {
      return "L'autore è obbligatorio"
    }

    if (form.readTime.value < 0) {
      return 'Inserisci un tempo di lettura valido >= di 0'
    }

    if (form.readTime.unit !== 'sec' || form.readTime.unit !== 'min') {
      return "Seleziona un'unità di tempo corretta"
    }

    return null
  }

  const createNewPost = async () => {
    resetMessages()

    const validationError = validateForm()

    if (validationError) {
      setError(validationError)
      return
    }

    setLoading(true)

    try {
      const response = await fetch('http://localhost:4545/blogPosts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(form),
      })

      if (!response.ok) {
        throw new Error('Errore durante la creazione del post')
      }

      const { blogPost } = await response.json()

      if (coverFile) {
        const formData = new FormData()
        formData.append('cover', coverFile)

        const uploadResponse = await fetch(`http://localhost:4545/blogPosts/${blogPost._id}/cover`, {
          method: 'PUT',
          body: formData,
        })

        if (!uploadResponse.ok) {
          throw new Error("Errore durante l'upload della copertina")
        }
      }

      setSuccess('Post creato correttamente')
      setForm(initialFormState)
      setCoverFile(null)
    } catch (err) {
      setError(err.message || 'Si è verificato un errore')
    } finally {
      setLoading(false)
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    createNewPost()
  }

  return (
    <Container className="new-blog-container">
      <Form className="mt-5" onSubmit={handleSubmit}>
        {error && <Alert variant="danger">{error}</Alert>}

        {success && <Alert variant="success">{success}</Alert>}

        <Form.Group className="mt-3">
          <Form.Label>Titolo</Form.Label>

          <Form.Control
            name="title"
            size="lg"
            placeholder="Inserisci il titolo"
            value={form.title}
            onChange={handleInputChange}
            required
          />
        </Form.Group>

        <Form.Group className="mt-3">
          <Form.Label>Categoria</Form.Label>

          <Form.Select name="category" size="lg" value={form.category} onChange={handleInputChange}>
            <option value="">--- Seleziona una categoria ---</option>
            <option value="Categoria 1">Categoria 1</option>
            <option value="Categoria 2">Categoria 2</option>
            <option value="Categoria 3">Categoria 3</option>
            <option value="Categoria 4">Categoria 4</option>
            <option value="Categoria 5">Categoria 5</option>
          </Form.Select>
        </Form.Group>

        <Form.Group className="mt-3">
          <Form.Label>Autore</Form.Label>

          <Form.Control
            name="author"
            type="email"
            size="lg"
            placeholder="m.rossi@domain.com"
            value={form.author}
            onChange={handleInputChange}
            required
          />
        </Form.Group>

        <Form.Group className="mt-3">
          <Form.Label>Copertina</Form.Label>

          <Form.Control type="file" size="lg" accept="image/*" onChange={handleCoverChange} />
        </Form.Group>

        <Form.Group className="mt-3">
          <Form.Label>Tempo di lettura</Form.Label>

          <InputGroup>
            <Form.Control
              name="value"
              size="lg"
              type="number"
              placeholder="10"
              min={1}
              value={form.readTime.value}
              onChange={handleReadTimeChange}
            />

            <Form.Select name="unit" size="lg" value={form.readTime.unit} onChange={handleReadTimeChange}>
              <option value="sec">Secondi</option>
              <option value="min">Minuti</option>
            </Form.Select>
          </InputGroup>
        </Form.Group>

        <Form.Group className="mt-3">
          <Form.Label>Contenuto Blog</Form.Label>

          <Editor content={form.content} setContent={handleEditorChange} />
        </Form.Group>

        <Form.Group className="d-flex mt-4 justify-content-end">
          <Button
            type="button"
            size="lg"
            variant="outline-dark"
            onClick={() => {
              setForm(initialFormState)
              resetMessages()
            }}
          >
            Reset
          </Button>

          <Button type="submit" size="lg" variant="dark" disabled={loading} style={{ marginLeft: '1rem' }}>
            {loading ? (
              <>
                <Spinner animation="border" size="sm" className="me-2" />
                Salvataggio...
              </>
            ) : (
              'Invia'
            )}
          </Button>
        </Form.Group>
      </Form>
    </Container>
  )
}

export default NewBlogPost
