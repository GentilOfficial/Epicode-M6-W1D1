import { jwtDecode } from 'jwt-decode'
import { createContext, useEffect, useState } from 'react'

export const AuthContext = createContext(null)

const AuthenticationProvider = ({ children }) => {
  const [token, setToken] = useState(null)
  const [user, setUser] = useState(null)

  const isTokenValid = (jwt) => {
    try {
      const decoded = jwtDecode(jwt)
      if (!decoded.exp) return false
      return decoded.exp * 1000 > Date.now()
    } catch {
      return false
    }
  }

  const logout = () => {
    setToken(null)
    setUser(null)
    localStorage.removeItem('token')
  }

  const loadUserFromToken = async (jwt) => {
    if (!isTokenValid(jwt)) {
      logout()
      return false
    }

    try {
      const response = await fetch(`${import.meta.env.VITE_API_SERVER}/me`, {
        headers: {
          Authorization: jwt,
        },
      })

      if (!response.ok) throw new Error()

      const { author } = await response.json()

      setUser(author)
      setToken(jwt)
      localStorage.setItem('token', jwt)

      return true
    } catch (e) {
      logout()
      return false
    }
  }

  const login = async (jwt) => {
    return await loadUserFromToken(jwt)
  }

  const initAuth = async () => {
    const savedToken = localStorage.getItem('token')
    if (!savedToken) return

    await loadUserFromToken(savedToken)
  }

  useEffect(() => {
    initAuth()
  }, [])

  useEffect(() => {
    if (!token) return

    const decoded = jwtDecode(token)
    const expiresIn = decoded.exp * 1000 - Date.now()

    if (expiresIn <= 0) {
      logout()
      return
    }

    const timeout = setTimeout(logout, expiresIn)
    return () => clearTimeout(timeout)
  }, [token])

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
