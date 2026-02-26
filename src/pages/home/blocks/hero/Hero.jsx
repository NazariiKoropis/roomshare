//styles
import styles from './Hero.module.scss'
import styledButton from './../../../../components/ui/button/Button.module.scss'

//react
import { Link } from 'react-router-dom'

//libs
import clsx from 'clsx'

function Hero() {
  const primaryBtnStyle = clsx(
    styledButton.button,
    styledButton['button--primary'],
  )
  const ghostBtnStyle = clsx(styledButton.button, styledButton['button--ghost'])

  return (
    <section className={styles.heroWrapper}>
      <div className={styles.heroTitle}>
        <h1>
          Знайди ідеальну кімнату. <br />
          Або ідеального сусіда.
        </h1>
        <p>
          Тисячі перевірених оголошень по всій Україні без ріелторів та комісій.
        </p>

        <div className={styles.buttonGroup}>
          <Link className={primaryBtnStyle} to="/rooms">
            Знайти кімнату
          </Link>
          <Link className={ghostBtnStyle} to="/people">
            Шукати сусіда
          </Link>
        </div>
      </div>

      <div className={styles.imageSection}></div>
    </section>
  )
}

export default Hero
