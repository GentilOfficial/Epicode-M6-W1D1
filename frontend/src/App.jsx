import { Route, BrowserRouter as Router, Routes } from 'react-router'
import Footer from './components/footer/Footer'
import NavBar from './components/navbar/BlogNavbar'
import PrivateRoute from './components/routes/PrivateRoute'
import AuthenticationProvider from './providers/AuthenticationProvider'
import Login from './views/auth/Login'
import Signup from './views/auth/Signup'
import Blog from './views/blog/Blog'
import Home from './views/home/Home'
import NewBlogPost from './views/new/New'

const App = () => {
  return (
    <AuthenticationProvider>
      <div className="d-flex flex-column wrapper">
        <Router>
          <NavBar />
          <div className="main-content">
            <Routes>
              <Route element={<PrivateRoute />}>
                <Route path="/" exact element={<Home />} />
                <Route path="/blog/:id" element={<Blog />} />
                <Route path="/new" element={<NewBlogPost />} />
              </Route>
              <Route element={<PrivateRoute type="auth" />}>
                <Route path="/login" exact element={<Login />} />
                <Route path="/signup" exact element={<Signup />} />
              </Route>
            </Routes>
          </div>
          <Footer />
        </Router>
      </div>
    </AuthenticationProvider>
  )
}

export default App
