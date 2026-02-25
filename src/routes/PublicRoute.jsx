//react
import { Navigate } from 'react-router-dom'
//context
import { useAuth } from '../context/AuthContext'

function PublicRoute({ children }) {
  const { currentUser, loading, userRole } = useAuth()

  if (loading) {
    return (
      <div style={{ padding: '20px', textAlign: 'center' }}>
        Завантаження...
      </div>
    )
  }

  if (currentUser) {
    return <Navigate to={`/${userRole}`} replace />
  }

  return children
}

export default PublicRoute
