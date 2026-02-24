//react
import { useState, useEffect } from 'react'
import { AuthContext } from './AuthContext'
import { auth } from './../firebase/firebase'
import { onAuthStateChanged } from 'firebase/auth'

//service
import { getUserRoleById } from './../services/user.service'

function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null)
  const [userRole, setUserRole] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        const role = await getUserRoleById(user.uid)
        setUserRole(role)
        setCurrentUser(user)
      } else {
        setCurrentUser(false)
        setUserRole(false)
      }
      setLoading(false)
    })

    return unsubscribe
  }, [])

  const value = {
    currentUser,
    userRole,
    loading,
  }
  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  )
}

export default AuthProvider
