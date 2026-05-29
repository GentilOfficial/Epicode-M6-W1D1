import { Card } from 'react-bootstrap'
import { Link } from 'react-router'
import BlogAuthor from '../blog-author/BlogAuthor'
import './styles.css'

const BlogItem = (props) => {
  const { title, cover, author, category, readTime, _id } = props

  return (
    <Link to={`/blog/${_id}`} className="blog-link">
      <Card className="blog-card">
        <Card.Img variant="top" src={cover} className="blog-cover" />

        <Card.Body>
          <div className="mb-2 text-muted">{category}</div>

          <Card.Title>{title}</Card.Title>

          <div className="mt-3">
            <small>
              {readTime.value} {readTime.unit}
            </small>
          </div>
        </Card.Body>

        <Card.Footer>
          <BlogAuthor author={author} />
        </Card.Footer>
      </Card>
    </Link>
  )
}

export default BlogItem
