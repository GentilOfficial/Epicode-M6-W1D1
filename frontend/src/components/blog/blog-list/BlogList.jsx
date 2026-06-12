import { useContext, useEffect, useState } from 'react'
import { Alert, Col, Form, Row, Spinner } from 'react-bootstrap'
import { AuthContext } from '../../../providers/AuthenticationProvider'
import Pagination from '../../pagination/Pagination'
import BlogItem from '../blog-item/BlogItem'

const BlogList = () => {
  const { token } = useContext(AuthContext)

  const [posts, setPosts] = useState([])
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)

  const [searchInput, setSearchInput] = useState('')
  const [searchTitle, setSearchTitle] = useState('')

  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const pageSize = 6

  const getPosts = async (page, title) => {
    if (!token) return

    setLoading(true)
    setError(null)

    try {
      const res = await fetch(
        `${import.meta.env.VITE_API_SERVER}/blogPosts?currentPage=${page}&pageSize=${pageSize}&title=${title}`,
        {
          headers: { Authorization: token },
        },
      )

      if (!res.ok) {
        throw new Error(`HTTP error ${res.status}`)
      }

      const data = await res.json()

      if (!data || !data.data) {
        throw new Error('Risposta API non valida')
      }

      setPosts(data.data)
      setTotalPages(data.pages?.totals ?? 1)
    } catch (err) {
      setError(err.message || 'Errore nel caricamento dei post')
      setPosts([])
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    getPosts(currentPage, searchTitle)
  }, [currentPage, searchTitle])

  const handleSearch = (e) => {
    setSearchInput(e.target.value)
  }

  const handleSearchSubmit = (e) => {
    e.preventDefault()
    setCurrentPage(1)
    setSearchTitle(searchInput)
  }

  const isEmpty = !loading && !error && posts.length === 0

  return (
    <>
      <Form className="mb-4" onSubmit={handleSearchSubmit}>
        <Form.Group>
          <Form.Control type="text" placeholder="Cerca per titolo..." value={searchInput} onChange={handleSearch} />
        </Form.Group>
      </Form>

      {error && <Alert variant="danger">{error}</Alert>}

      {loading && (
        <div className="text-center my-3">
          <Spinner animation="border" />
        </div>
      )}

      {isEmpty && <Alert variant="info">Nessun articolo trovato.</Alert>}

      {!loading && !error && (
        <Row>
          {posts.map((post) => (
            <Col key={post._id} md={4} style={{ marginBottom: 50 }}>
              <BlogItem {...post} />
            </Col>
          ))}
        </Row>
      )}

      <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={setCurrentPage} />
    </>
  )
}

export default BlogList
