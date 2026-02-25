//styles
import styles from './Footer.module.scss'

//components
import Container from '../container/Container'
import { Logo } from '../../ui/svg/Logo'

//react
import { Link } from 'react-router-dom'

const NAV_ITEMS = [
  { path: '/', label: 'Головна' },
  { path: '/rooms', label: 'Кімнати' },
  { path: '/people', label: 'Люди' },
]

function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className={styles.footer}>
      <Container>
        <div className={styles.footerTop}>
          <div className={styles.logoColumn}>
            <Link to="/" className={styles.logoLink}>
              <Logo width={36} height={36} />
              <span className={styles.logoText}>
                room<span className={styles.accent}>Share</span>
              </span>
            </Link>
            <p className={styles.slogan}>Твій ідеальний сусід вже тут.</p>
          </div>

          <nav className={styles.navColumn}>
            <h3 className={'visually-hidden'}>Навігація по сторінці</h3>
            <ul className={styles.navList}>
              {NAV_ITEMS.map((item) => (
                <li key={item.path}>
                  <Link to={item.path} className={styles.navLink}>
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <address>
            <h3 className={styles.columnTitle}>Контакти</h3>
            <ul className={styles.addressList}>
              <li>
                <a
                  href="mailto:info@roomshare.ua"
                  className={styles.addressLink}
                >
                  info@roomshare.ua
                </a>
              </li>
              <li>
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noreferrer"
                  className={styles.addressLink}
                >
                  Instagram
                </a>
              </li>
              <li>
                <a
                  href="https://wa.me/"
                  target="_blank"
                  rel="noreferrer"
                  className={styles.addressLink}
                >
                  WhatsApp
                </a>
              </li>
            </ul>
          </address>
        </div>

        <div className={styles.footerBottom}>
          <p>&copy; {currentYear} RoomShare. Всі права захищено.</p>
        </div>
      </Container>
    </footer>
  )
}

export default Footer
