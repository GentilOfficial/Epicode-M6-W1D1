import { useContext, useEffect } from 'react'
import { Col, Container, Row, Spinner } from 'react-bootstrap'
import { useSearchParams } from 'react-router'
import { AuthContext } from '../../providers/AuthenticationProvider'
import './styles.css'

const OAuth = () => {
  const [params, setParams] = useSearchParams()
  const token = params.get('token')
  const { login, user } = useContext(AuthContext)

  useEffect(() => {
    login(token)
  }, [token])
  return (
    <Container fluid="sm">
      <Row className="loading-spinner-container">
        <Col className="d-flex align-items-center justify-content-center">
          <Spinner />
        </Col>
      </Row>
    </Container>
  )
}

export default OAuth
