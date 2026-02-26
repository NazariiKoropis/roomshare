//styles
import styles from './HowItWorks.module.scss'

//components
import Container from './../../../../components/layout/container/Container'

//icons
import { BadgePlus, Search, Car } from 'lucide-react'

const STEPS = [
  {
    id: 1,
    icon: <BadgePlus width={32} height={32} />,
    title: 'Створи профіль',
    desc: 'Розкажи про свої звички: чи куриш, чи є тварини.',
  },
  {
    id: 2,
    icon: <Search width={32} height={32} />,
    title: 'Знайди "Метч"',
    desc: 'Гортай кімнати або анкети людей.',
  },
  {
    id: 3,
    icon: <Car width={32} height={32} />,
    title: 'Заїжджай',
    desc: 'Списуйся в WhatsApp і домовляйся про перегляд.',
  },
]

function HowItWorks() {
  return (
    <section className={styles.section}>
      <Container>
        <h2 className={styles.sectionTitle}>Як це працює?</h2>

        <ul className={styles.hiwWrapper}>
          {STEPS.map((item) => (
            <li key={item.id} className={styles.listItem}>
              <div className={styles.iconBlock}>{item.icon}</div>

              <div className={styles.textBlock}>
                <h3 className={styles.stepTitle}>{item.title}</h3>
                <p className={styles.stepDesc}>{item.desc}</p>
              </div>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  )
}

export default HowItWorks
