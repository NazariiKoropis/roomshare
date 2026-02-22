//components
import Header from './components/layout/header/Header'
import Footer from './components/layout/footer/Footer'
//pages
import Home from './pages/home/Home'

import NotFound from './pages/notFound/NotFound'

//react
import { Routes, Route } from 'react-router-dom'

function App() {
  return (
    <>
      <Header />

      <main>
        {' '}
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/*" element={<NotFound />}></Route>
        </Routes>
      </main>

      <Footer />
    </>
  )
}

export default App
