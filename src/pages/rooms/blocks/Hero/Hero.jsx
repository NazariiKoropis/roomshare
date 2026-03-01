//styles
import styles from './Hero.module.scss'

//components
import Container from '../../../../components/layout/container/Container'

function Hero() {
  return (
    <section className={styles.hero}>
      <Container>
        <div className={styles.heroContent}>
          <h1 className={styles.heroTitle}>Знайди кімнату своєї мрії</h1>
          <p className={styles.heroSubtitle}>
            Переглядай актуальні оголошення та обирай найкращий варіант для
            себе.
          </p>
        </div>
      </Container>
    </section>
  )
}

export default Hero
