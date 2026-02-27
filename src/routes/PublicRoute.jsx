//react
import { Navigate } from 'react-router-dom'
//context
import { useAuth } from '../context/AuthContext'

import { ThreeDots } from 'react-loader-spinner'

function PublicRoute({ children }) {
  const { currentUser, loading, userRole } = useAuth()

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

  if (currentUser) {
    const target = userRole ? `/${userRole}` : '/'
    return <Navigate to={target} replace />
  }

  return children
}

export default PublicRoute
