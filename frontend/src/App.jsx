import { Route, BrowserRouter as Router, Routes } from 'react-router'
import Footer from './components/footer/Footer'
import NavBar from './components/navbar/BlogNavbar'
import Blog from './views/blog/Blog'
import Home from './views/home/Home'
import NewBlogPost from './views/new/New'

const App = () => {
  return (
    <Router>
      <NavBar />
      <Routes>
        <Route path="/" exact element={<Home />} />
        <Route path="/blog/:id" element={<Blog />} />
        <Route path="/new" element={<NewBlogPost />} />
      </Routes>
      <Footer />
    </Router>
  )
}

export default App
