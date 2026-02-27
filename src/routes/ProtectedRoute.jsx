//react
import { Navigate } from 'react-router-dom'
//context
import { useAuth } from '../context/AuthContext'

//libs
import { ThreeDots } from 'react-loader-spinner'

function ProtectedRoute({ allowedRoles = [], children }) {
  const { currentUser, userRole, loading } = useAuth()

  if (loading) {
    return (
      <ThreeDots
        height="80"
        width="80"
        radius="9"
        color="var(--accent-primary)"
        ariaLabel="three-dots-loading"
        wrapperStyle={{ margin: '20px' }}
        wrapperClass="custom-loader"
        visible={true}
      />
    )
  }

  if (!currentUser) {
    return <Navigate to="/" replace />
  }

  if (currentUser && userRole === null) {
    return (
      <ThreeDots
        height="80"
        width="80"
        radius="9"
        color="var(--accent-primary)"
        ariaLabel="three-dots-loading"
        wrapperStyle={{ margin: '20px' }}
        wrapperClass="custom-loader"
        visible={true}
      />
    )
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
