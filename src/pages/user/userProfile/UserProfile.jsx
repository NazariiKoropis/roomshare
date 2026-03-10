//styles
import styles from './UserProfile.module.scss'

//components
import Container from '../../../components/layout/container/Container'
import Button from './../../../components/ui/button/Button'

//services
import { logoutUser } from './../../../services/auth.service'

//react
import { NavLink, Outlet } from 'react-router-dom'

import { useAuth } from '../../../context/AuthContext'

function UserProfile() {
  const { currentUser } = useAuth()
  const handleLogout = async (e) => {
    e.preventDefault()
    await logoutUser()
  }

  return (
    <Container styled={styles.profileWrapper}>
      <div className={styles.dashboardGrid}>
        <aside className={styles.sidebar}>
          <div className={styles.userInfo}>
            <h2>Особистий кабінет</h2>
            <h3>
              Вітаємо: <span> {currentUser.displayName}</span>
            </h3>
          </div>

          <nav className={styles.navMenu}>
            <NavLink
              to="/user"
              end
              className={({ isActive }) =>
                isActive ? styles.activeLink : styles.link
              }
            >
              Мої дані
            </NavLink>
            <NavLink
              to="/user/room"
              className={({ isActive }) =>
                isActive ? styles.activeLink : styles.link
              }
            >
              Моя кімната
            </NavLink>
            <NavLink
              to="/user/resume"
              className={({ isActive }) =>
                isActive ? styles.activeLink : styles.link
              }
            >
              Моя анкета
            </NavLink>
            <NavLink
              to="/user/requests"
              className={({ isActive }) =>
                isActive ? styles.activeLink : styles.link
              }
            >
              Мої заявки та скарги
            </NavLink>
          </nav>

          <Button variant="error" onClick={handleLogout}>
            Вийти з акаунта
          </Button>
        </aside>

        <div className={styles.content}>
          <Outlet />
        </div>
      </div>
    </Container>
  )
}

export default UserProfile
