import { useEffect, useState } from 'react'
import { Badge, Container, Image } from 'react-bootstrap'
import { useNavigate, useParams } from 'react-router'
import BlogAuthor from '../../components/blog/blog-author/BlogAuthor'
import BlogLike from '../../components/likes/BlogLike'
import './styles.css'

const Blog = () => {
  const [blog, setBlog] = useState(null)
  const [loading, setLoading] = useState(true)

  const params = useParams()
  const navigate = useNavigate()

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const { id } = params

        const res = await fetch(`http://localhost:4545/blogPosts/${id}`)

        if (!res.ok) {
          navigate('/404')
          return
        }

        const data = await res.json()
        console.log(data)
        setBlog(data)
      } catch (err) {
        console.error(err)
        navigate('/404')
      } finally {
        setLoading(false)
      }
    }

    fetchBlog()
  }, [params.id, navigate])

  if (loading) {
    return <div>loading</div>
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
              lettura da {blog.readTime.value} {blog.readTime.unit}
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
