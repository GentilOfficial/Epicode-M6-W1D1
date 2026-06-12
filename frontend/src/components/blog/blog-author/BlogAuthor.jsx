import { Col, Row } from 'react-bootstrap'
import './styles.css'

const BlogAuthor = ({ author }) => {
  return (
    <Row>
      <Col className="d-flex gap-2 align-items-center">
        <img src={author.avatar} alt={`${author.name} ${author.surname}`} className="blog-author rounded-circle" />
        <small>
          {author.name} {author.surname}
        </small>
      </Col>
    </Row>
  )
}

export default BlogAuthor
