//components
import Container from '../../../components/layout/container/Container'
import Button from './../../../components/ui/button/Button'

//services
import { logoutUser } from './../../../services/auth.service'

function UserProfile() {
  const handleLogout = async (e) => {
    e.preventDefault()
    await logoutUser()
  }

  return (
    <Container>
      <h1>user</h1>
      <Button onClick={handleLogout}>logout</Button>
    </Container>
  )
}

export default UserProfile
