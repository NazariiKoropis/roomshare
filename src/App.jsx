//components
import Header from './components/layout/header/Header'
import Footer from './components/layout/footer/Footer'
//pages
import Home from './pages/home/Home'
import Login from './pages/login/Login'
import Register from './pages/register/Register'
import NotFound from './pages/notFound/NotFound'

//react
import { Routes, Route, useLocation } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'

function App() {
  const location = useLocation()

  return (
    <>
      <Header />

      <main>
        <AnimatePresence mode="wait">
          <Routes location={location} key={location.pathname}>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />

            <Route path="/*" element={<NotFound />} />
          </Routes>
        </AnimatePresence>
      </main>

      <Footer />
    </>
  )
}

export default App
