import { Col, Row } from 'react-bootstrap'
import './styles.css'

const BlogAuthor = ({ author }) => {
  return (
    <Row>
      <Col>
        <small>{author}</small>
      </Col>
    </Row>
  )
}

export default BlogAuthor
