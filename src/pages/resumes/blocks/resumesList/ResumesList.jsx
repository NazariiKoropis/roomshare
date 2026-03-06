//styles
import styles from './ResumesList.module.scss'

//components
import PeopleCard from '../../../../components/shared/peopleCard/PeopleCard'

function ResumesList({ resumes = [] }) {
  if (!resumes || resumes.length === 0) {
    return (
      <section className={styles.emptyState}>
        <h3>Поки що немає жодного резюме 😔</h3>
        <p>Але ви можете стати першим!</p>
      </section>
    )
  }

  return (
    <section>
      <h2 className={styles.title}>Останні резюме</h2>
      <ul className={styles.listGrid}>
        {resumes.map((item) => (
          <li key={item.id}>
            <PeopleCard person={item} />
          </li>
        ))}
      </ul>
    </section>
  )
}

export default ResumesList
