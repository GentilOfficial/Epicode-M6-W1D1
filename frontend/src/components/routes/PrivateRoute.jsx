import { useContext } from 'react'
import { Navigate, Outlet } from 'react-router'
import { AuthContext } from '../../providers/AuthenticationProvider'

const PrivateRoute = ({ type = 'site' }) => {
  const { isAuthenticated } = useContext(AuthContext)

  if (!isAuthenticated && type === 'site') {
    return <Navigate to="/login" replace />
  }

  if (isAuthenticated && type === 'auth') {
    return <Navigate to="/" replace />
  }

  return <Outlet />
}

export default PrivateRoute
