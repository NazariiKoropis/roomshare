//components
import Header from './components/layout/header/Header'
import Footer from './components/layout/footer/Footer'
//pages
import Home from './pages/home/Home'
import Login from './pages/login/login'
import Register from './pages/register/Register'

import NotFound from './pages/notFound/NotFound'

//react
import { Routes, Route, useLocation } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'

function App() {
  const location = useLocation()

  return (
    <>
      {' '}
      <AnimatePresence mode="wait">
        {' '}
        <Header />{' '}
        <main>
          {' '}
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/*" element={<NotFound />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </Routes>
        </main>
        <Footer />
      </AnimatePresence>
    </>
  )
}

export default App
