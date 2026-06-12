import { Route, BrowserRouter as Router, Routes } from 'react-router'
import Footer from './components/footer/Footer'
import NavBar from './components/navbar/BlogNavbar'
import PrivateRoute from './components/routes/PrivateRoute'
import AuthenticationProvider from './providers/AuthenticationProvider'
import Blog from './views/blog/Blog'
import Home from './views/home/Home'
import Login from './views/login/Login'
import NewBlogPost from './views/new/New'

const App = () => {
  return (
    <AuthenticationProvider>
      <Router>
        <NavBar />
        <Routes>
          <Route element={<PrivateRoute />}>
            <Route path="/" exact element={<Home />} />
            <Route path="/blog/:id" element={<Blog />} />
            <Route path="/new" element={<NewBlogPost />} />
          </Route>
          <Route element={<PrivateRoute type="auth" />}>
            <Route path="/login" exact element={<Login />} />
          </Route>
        </Routes>
        <Footer />
      </Router>
    </AuthenticationProvider>
  )
}

export default App
