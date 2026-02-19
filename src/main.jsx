//react
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

//styles
import './assets/styles/global.scss'

//components
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
