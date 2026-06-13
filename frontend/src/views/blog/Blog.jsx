import { useContext, useEffect, useState } from 'react'
import { Alert, Badge, Container, Image, Spinner } from 'react-bootstrap'
import { useNavigate, useParams } from 'react-router'
import BlogAuthor from '../../components/blog/blog-author/BlogAuthor'
import BlogLike from '../../components/likes/BlogLike'
import { AuthContext } from '../../providers/AuthenticationProvider'
import './styles.css'

const Blog = () => {
  const { token, logout } = useContext(AuthContext)
  const [blog, setBlog] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const params = useParams()
  const navigate = useNavigate()

  useEffect(() => {
    const fetchBlog = async () => {
      setLoading(true)
      setError(null)

      try {
        const { id } = params

        const res = await fetch(`${import.meta.env.VITE_API_SERVER}/blogPosts/${id}`, {
          headers: {
            Authorization: token,
          },
        })

        if (res.status === 401) {
          logout()
          throw new Error('Sessione scaduta')
        }

        if (res.status === 404) {
          navigate('/404')
          return
        }

        if (!res.ok) {
          throw new Error(`HTTP error ${res.status}`)
        }

        const data = await res.json()

        if (!data) {
          throw new Error('Dati non validi')
        }

        setBlog(data)
      } catch (err) {
        setError(err.message || 'Errore nel caricamento del blog')
      } finally {
        setLoading(false)
      }
    }

    fetchBlog()
  }, [params.id, navigate])

  if (loading) {
    return (
      <div className="text-center my-5">
        <Spinner animation="border" />
      </div>
    )
  }

  if (error) {
    return (
      <Container className="mt-4">
        <Alert variant="danger">{error}</Alert>
      </Container>
    )
  }

  if (!blog) {
    return null
  }

  return (
    <div className="blog-details-root">
      <Container>
        <Image className="blog-details-cover" src={blog.cover} fluid />

        <h1 className="blog-details-title">{blog.title}</h1>

        <Badge bg="dark">{blog.category}</Badge>

        <div className="blog-details-container">
          <div className="blog-details-author">
            <BlogAuthor author={blog.author} />
          </div>

          <div className="blog-details-info">
            <div>{blog.createdAt}</div>

            <div>
              lettura da {blog.readTime?.value} {blog.readTime?.unit}
            </div>

            <div style={{ marginTop: 20 }}>
              <BlogLike defaultLikes={['123', '456', '789', '101']} onChange={console.log} />
            </div>
          </div>
        </div>

        <div
          dangerouslySetInnerHTML={{
            __html: blog.content,
          }}
        />
      </Container>
    </div>
  )
}

export default Blog
