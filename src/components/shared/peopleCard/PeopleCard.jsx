//styles
import styles from './PeopleCard.module.scss'

//utili
import { DateConvertor } from './../../../utils/dateConvert'
import { getPeopleImage } from './../../../utils/imagesUtil'
//react
import { useNavigate } from 'react-router-dom'

function PeopleCard({ person }) {
  const navigate = useNavigate()

  if (!person) return null

  const handleNavigate = () => {
    navigate(`/resumes/${person.id}`)
  }

  const {
    photoUrl,
    displayName,
    title,
    desc,
    gender,
    birthDate,
    city,
    budget,
    slug,
  } = person

  return (
    <article className={styles.card} onClick={handleNavigate}>
      <img
        src={getPeopleImage(slug) || photoUrl || getPeopleImage('default.svg')}
        className={styles.img}
        alt={displayName}
        loading="lazy"
      />

      <div className={styles.cardInfo}>
        <div className={styles.header}>
          <h2 className={styles.title}>{title}</h2>

          {budget && <span className={styles.budget}>{budget} ₴</span>}
        </div>

        <h3 className={styles.name}>{displayName}</h3>
        <p className={styles.desc}>{desc}</p>

        <ul className={styles.infoList}>
          {gender && <li>{gender === 'male' ? 'Чоловік' : 'Жінка'}</li>}
          {birthDate && <li>{DateConvertor(birthDate)}</li>}
          {city && <li>{city}</li>}
        </ul>
      </div>
    </article>
  )
}

export default PeopleCard
