//styles
import styles from './Header.module.scss'
import buttonStyles from './../../ui/button/Button.module.scss'

//components
import Container from '../container/Container'
import { Logo } from '../../ui/svg/Logo'
import { UserIcon } from './../../ui/svg/UserIcon'

//react
import { useState, useEffect } from 'react'
import { NavLink, Link } from 'react-router-dom'
//libs
import clsx from 'clsx'

const NAV_ITEMS = [
  { path: '/', label: 'Головна' },
  { path: '/rooms', label: 'Кімнати' },
  { path: '/people', label: 'Люди' },
]

//TODO: add logout button, roles(user and admin)

function Header() {
  const [isAuth, setAuth] = AuthContext()
  const [isOpenBurger, setIsOpenBurger] = useState(false)
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem('app-theme') || 'dark'
  })

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
    localStorage.setItem('app-theme', theme)
  }, [theme])

  const getNavLinkClass = ({ isActive }) => {
    return isActive
      ? clsx(styles.navLink, styles[`navLink--active`])
      : styles.navLink
  }

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light'
    setTheme(newTheme)
    document.documentElement.setAttribute('data-theme', newTheme)
    localStorage.setItem('app-theme', newTheme)
  }

  const handleBurgerMenu = () => {
    setIsOpenBurger((prev) => !prev)
  }
  const closeMenu = () => setIsOpenBurger(false)

  return (
    <header className={styles.headerWrapper}>
      <Container>
        <div className={styles.header}>
          <Link to="/">
            <Logo width={36} height={36} />
            <span className={styles.logoText}>
              room<span className={styles.accent}>Share</span>
            </span>
          </Link>

          <nav className={styles.desktopNav}>
            <ul className={styles.desktopNavList}>
              {NAV_ITEMS.map((item) => (
                <li key={item.path}>
                  <NavLink to={item.path} className={getNavLinkClass}>
                    {item.label}
                  </NavLink>
                </li>
              ))}
            </ul>
          </nav>

          <div className={styles.desktopAuth}>
            <button
              onClick={toggleTheme}
              className={styles.themeToggle}
              aria-label="Toggle theme"
            >
              {theme === 'light' ? '🌙' : '☀️'}
            </button>
            {isAuth ? (
              <NavLink
                to="/profile"
                className={({ isActive }) =>
                  clsx(styles.userLogo, isActive && styles['userLogo--active'])
                }
              >
                <UserIcon width={32} height={32} />
                <span>Мій профіль</span>
              </NavLink>
            ) : (
              <NavLink
                to="/login"
                className={clsx(
                  buttonStyles.button,
                  buttonStyles[`button--primary`],
                )}
              >
                Login
              </NavLink>
            )}
          </div>

          <div
            className={clsx(
              styles.burgerBtn,
              isOpenBurger && styles[`burgerBtn--active`],
            )}
            onClick={handleBurgerMenu}
            aria-label="Toggle menu"
          >
            <span></span>
            <span></span>
            <span></span>
          </div>
        </div>
      </Container>

      <div
        className={clsx(
          styles.mobileMenu,
          isOpenBurger && styles['mobileMenu--open'],
        )}
      >
        <nav>
          <ul>
            {NAV_ITEMS.map((item) => (
              <li key={item.path}>
                <NavLink to={item.path} className={getNavLinkClass}>
                  {item.label}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>

        <div className={styles.mobileAuth}>
          <button
            onClick={toggleTheme}
            className={styles.themeToggle}
            aria-label="Toggle theme"
          >
            {theme === 'light' ? '🌙' : '☀️'}
          </button>
          {isAuth ? (
            <NavLink
              to="/profile"
              className={styles.userLogo}
              onClick={closeMenu}
            >
              <UserIcon width={32} height={32} />
              <span>Мій профіль</span>
            </NavLink>
          ) : (
            <NavLink
              to="/login"
              className={clsx(
                buttonStyles.button,
                buttonStyles['button--primary'],
                buttonStyles['button-fullwidth'],
              )}
            >
              Login
            </NavLink>
          )}
        </div>
      </div>
    </header>
  )
}

export default Header
