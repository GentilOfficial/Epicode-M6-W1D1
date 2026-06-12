import { jwtDecode } from 'jwt-decode'
import { createContext, useEffect, useState } from 'react'

export const AuthContext = createContext(null)

const AuthenticationProvider = ({ children }) => {
  const [token, setToken] = useState(null)
  const [user, setUser] = useState(null)

  const login = (jwt) => {
    try {
      const decoded = jwtDecode(jwt)

      setToken(jwt)
      setUser(decoded)
      localStorage.setItem('token', jwt)
    } catch (e) {
      console.error('Invalid token:', e)
      logout()
    }
  }

  const logout = () => {
    setToken(null)
    setUser(null)
    localStorage.removeItem('token')
  }

  useEffect(() => {
    const savedToken = localStorage.getItem('token')
    if (!savedToken) return

    try {
      const decoded = jwtDecode(savedToken)

      if (decoded.exp * 1000 < Date.now()) {
        logout()
        return
      }

      setToken(savedToken)
      setUser(decoded)
    } catch (e) {
      console.error('Invalid stored token:', e)
      logout()
    }
  }, [])

  return (
    <AuthContext.Provider
      value={{
        token,
        user,
        isAuthenticated: !!token,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export default AuthenticationProvider
