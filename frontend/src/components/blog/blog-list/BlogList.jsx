import { useEffect, useState } from 'react'
import { Col, Form, Row } from 'react-bootstrap'
import Pagination from '../../pagination/Pagination'
import BlogItem from '../blog-item/BlogItem'

const BlogList = () => {
  const [posts, setPosts] = useState([])
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [searchTitle, setSearchTitle] = useState('')

  const pageSize = 6

  const getPosts = async (page, title = '') => {
    try {
      const response = await fetch(
        `http://localhost:4545/blogPosts?currentPage=${page}&pageSize=${pageSize}&title=${title}`,
      )

      const { pages, data } = await response.json()

      setPosts(data)
      setTotalPages(pages.totals)
    } catch (e) {
      console.error(e)
    }
  }

  useEffect(() => {
    getPosts(currentPage, searchTitle)
  }, [currentPage, searchTitle])

  const handleSearch = (e) => {
    setSearchTitle(e.target.value)
    setCurrentPage(1)
  }

  return (
    <>
      <Form.Group className="mb-4">
        <Form.Control type="text" placeholder="Cerca per titolo..." value={searchTitle} onChange={handleSearch} />
      </Form.Group>

      <Row>
        {posts.map((post) => (
          <Col key={post._id} md={4} style={{ marginBottom: 50 }}>
            <BlogItem {...post} />
          </Col>
        ))}
      </Row>

      <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={setCurrentPage} />
    </>
  )
}

export default BlogList
