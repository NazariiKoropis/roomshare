//react
import { Navigate } from 'react-router-dom'
//context
import { useAuth } from '../context/AuthContext'

function ProtectedRoute({ allowedRoles = [], children }) {
  const { currentUser, userRole, loading } = useAuth()

  if (loading) {
    return (
      <div style={{ padding: '20px', textAlign: 'center' }}>
        Завантаження...
      </div>
    )
  }

  if (!currentUser) {
    return <Navigate to="/" replace />
  }

  if (allowedRoles.length > 0 && !allowedRoles.includes(userRole)) {
    console.warn(
      `Access Denied. User role: ${userRole}, Required: ${allowedRoles}`,
    )
    return <Navigate to="/" replace />
  }

  return children
}

export default ProtectedRoute
