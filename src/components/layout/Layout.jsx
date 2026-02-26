//components
import Header from './header/Header'
import Footer from './footer/Footer'

import React from 'react'
import { useOutlet, useLocation } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'

function Layout() {
  const location = useLocation()

  const outlet = useOutlet()

  return (
    <>
      <Header />
      <main>
        <AnimatePresence mode="wait">
          {outlet && React.cloneElement(outlet, { key: location.pathname })}
        </AnimatePresence>
      </main>
      <Footer />
    </>
  )
}

export default Layout
