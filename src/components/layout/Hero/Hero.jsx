//styles
import styles from './Hero.module.scss'

//components
import Container from '../container/Container'

function Hero({ title, text }) {
  return (
    <section className={styles.hero}>
      <Container>
        <div className={styles.heroContent}>
          <h1 className={styles.heroTitle}>{title}</h1>
          <p className={styles.heroSubtitle}>{text}</p>
        </div>
      </Container>
    </section>
  )
}

export default Hero
