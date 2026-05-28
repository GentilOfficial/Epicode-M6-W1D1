import { useEffect, useState } from 'react'
import { Col, Row } from 'react-bootstrap'
import BlogItem from '../blog-item/BlogItem'

const BlogList = (props) => {
  const [posts, setPosts] = useState([])

  const getPosts = async () => {
    try {
      const response = await fetch('http://localhost:4545/blogPosts')
      const { blogPosts } = await response.json()
      setPosts(blogPosts)
    } catch (e) {
      console.error(e)
    }
  }

  useEffect(() => {
    getPosts()
  }, [])

  return (
    <Row>
      {posts.map((post, i) => (
        <Col
          key={`item-${i}`}
          md={4}
          style={{
            marginBottom: 50,
          }}
        >
          <BlogItem key={post.title} {...post} />
        </Col>
      ))}
    </Row>
  )
}

export default BlogList
