//styles
import styles from './ResumeDetails.module.scss'

//components
import Hero from '../../components/layout/Hero/Hero'
import Container from '../../components/layout/container/Container'
import Button from '../../components/ui/button/Button'

import ReportModal from './blocks/ReportModal'
import RequestModal from './blocks/RequestModal' // Додано імпорт нової модалки

//react
import { useCallback, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'

//hooks
import { useFetch } from './../../hooks/useFetch'
import { useAuth } from './../../context/AuthContext'

//services
import { getPeopleCardById } from './../../services/people.service'

//loader
import { ThreeDots } from 'react-loader-spinner'

//utils
import { getPeopleImage } from '../../utils/imagesUtil'
import { DateConvertor } from './../../utils/dateConvert'

function ResumeDetails() {
  const { resumeId } = useParams()
  const { currentUser } = useAuth()
  const navigate = useNavigate()

  const fetchData = useCallback(() => getPeopleCardById(resumeId), [resumeId])
  const { data, loading } = useFetch(fetchData)

  const [isReportModalOpen, setIsReportModalOpen] = useState(false)
  const [isRequestModalOpen, setIsRequestModalOpen] = useState(false)

  if (loading || !data) {
    return (
      <Container>
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            minHeight: '50vh',
          }}
        >
          <ThreeDots
            height="100"
            width="100"
            radius="9"
            color="var(--accent-primary)"
            visible={true}
          />
        </div>
      </Container>
    )
  }

  const onContactClick = () => {
    if (!currentUser) {
      navigate('/login')
      return
    }
    setIsRequestModalOpen(true)
  }

  const onReportClick = () => {
    if (!currentUser) {
      navigate('/login')
      return
    }
    setIsReportModalOpen(true)
  }

  return (
    <>
      <Hero
        title={'Деталі кандидата'}
        text={
          "Дізнайтеся більше про майбутнього сусіда та зв'яжіться для обговорення."
        }
      />
      <Container>
        <div className={styles.gridWrapper}>
          <section className={styles.mainContent}>
            <div className={styles.header}>
              <h2 className={styles.title}>{data.title}</h2>
              <p className={styles.budget}>
                Бюджет: <span>{data.budget}</span> ₴ / місяць
              </p>
            </div>

            <div className={styles.descBlock}>
              <h3>Про себе:</h3>
              <p className={styles.desc}>{data.desc}</p>
            </div>
          </section>

          <aside className={styles.sidebar}>
            <div className={styles.imageWrapper}>
              <img
                src={
                  getPeopleImage(data.slug) ||
                  data.photoUrl ||
                  getPeopleImage('default.svg')
                }
                alt={data.displayName || 'Кандидат'}
              />
            </div>

            <div className={styles.userInfo}>
              <ul className={styles.list}>
                <li className={styles.listItem}>
                  <strong>Ім'я:</strong> {data.displayName}
                </li>
                <li className={styles.listItem}>
                  <strong>Місто:</strong> {data.city}
                </li>
                {data.gender && (
                  <li className={styles.listItem}>
                    <strong>Стать:</strong>{' '}
                    {data.gender === 'male' ? 'Чоловік' : 'Жінка'}
                  </li>
                )}
                <li className={styles.listItem}>
                  <strong>Опубліковано:</strong> {DateConvertor(data.createdAt)}
                </li>
              </ul>
            </div>

            <div className={styles.buttonBlock}>
              <Button fullWidth onClick={onContactClick}>
                Зв'язатися
              </Button>
              <Button variant="error" fullWidth onClick={onReportClick}>
                Надіслати скаргу
              </Button>
            </div>
          </aside>
        </div>
      </Container>

      <ReportModal
        isOpen={isReportModalOpen}
        setIsOpen={setIsReportModalOpen}
        resumeId={resumeId}
        currentUserId={currentUser?.uid}
      />

      <RequestModal
        isOpen={isRequestModalOpen}
        setIsOpen={setIsRequestModalOpen}
        targetID={resumeId}
        targetType="resume"
        ownerID={data.userID}
        currentUserID={currentUser?.uid}
      />
    </>
  )
}

export default ResumeDetails
