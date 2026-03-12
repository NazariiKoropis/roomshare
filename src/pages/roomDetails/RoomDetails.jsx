//styles
import styles from './RoomDetails.module.scss'

//components
import Container from './../../components/layout/container/Container'
import Button from './../../components/ui/button/Button'
import Hero from './../../components/layout/Hero/Hero'
import Map from './blocks/Map'
import ContactsModal from './blocks/modals/ContacsModal'
import ReportModal from './blocks/modals/ReportModal'

//react
import { useEffect, useState, useCallback } from 'react'

import { useAuth } from './../../context/AuthContext'

//routes
import { useParams } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'

//hooks
import { useFetch } from './../../hooks/useFetch'

//services
import { getRoomById } from './../../services/room.service'
import {
  getUserDisplayNameById,
  getUserContactsById,
} from './../../services/user.service'

//loader
import { ThreeDots } from 'react-loader-spinner'

//utils
import { getRoomImage } from '../../utils/imagesUtil'
import { DateConvertor } from './../../utils/dateConvert'

function RoomDetails() {
  const { currentUser } = useAuth()
  const { roomId } = useParams()

  const fetchData = useCallback(() => getRoomById(roomId), [roomId])

  const [ownerName, setOwnerName] = useState('Завантаження...')
  const [contacts, setContacts] = useState({})
  const { data, loading } = useFetch(fetchData)

  const [isCallModalOpen, setIsCallModalOpen] = useState(false)
  const [isReportModalOpen, setIsReportModalOpen] = useState(false)

  const navigate = useNavigate()

  const onCallModalClick = () => {
    setIsCallModalOpen(true)
  }

  const onReportModalClick = () => {
    if (!currentUser) {
      navigate('/login')
      return
    }
    setIsReportModalOpen(true)
  }

  useEffect(() => {
    if (data?.userID) {
      const fetchOwnerData = async () => {
        const [name, contactsData] = await Promise.all([
          getUserDisplayNameById(data.userID),
          getUserContactsById(data.userID),
        ])

        setOwnerName(name || 'Невідомий користувач')
        setContacts(contactsData || {})
      }
      fetchOwnerData()
    }
  }, [data?.userID])

  if (loading || !data) {
    return (
      <Container>
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <ThreeDots
            height="100"
            width="100"
            radius="9"
            color="var(--accent-primary)"
            ariaLabel="Завантаження"
            wrapperStyle={{ margin: '20px' }}
            wrapperClass="custom-loader"
            visible={true}
          />
        </div>
      </Container>
    )
  }

  const lat = data.location?.lat
  const lng = data.location?.lng
  const hasCoordinates = lat && lng

  return (
    <>
      <Hero
        title={'Знайди кімнату своєї мрії'}
        text={
          'Переглядай актуальні оголошення та обирай найкращий варіант для себе.'
        }
      />
      <Container>
        <section className={styles.block}>
          <article className={styles.roomImage}>
            <img
              src={getRoomImage(data.slug) || getRoomImage('default')}
              alt={data.desc}
            />
          </article>
          <div className={styles.roomInfo}>
            {' '}
            <div className={styles.textContent}>
              <h2 className={styles.title}>{data.title}</h2>
              <p className={styles.desc}>{data.desc}</p>
              <p className={styles.price}>
                <span>{data.price} </span>₴ / місяць
              </p>
            </div>
            <div className={styles.amenities}>
              <h3 className={styles.title}>Зручності:</h3>
              <ul className={styles.list}>
                {data.amenities?.length > 0 ? (
                  data.amenities.map((item) => (
                    <li key={item} className={styles.listItem}>
                      {item}
                    </li>
                  ))
                ) : (
                  <li className={styles.listItem}>Інформація відсутня</li>
                )}
              </ul>
            </div>
            <div className={styles.buttonBlock}>
              <Button onClick={onCallModalClick} fullWidth>
                Дзвонити
              </Button>
              <Button onClick={onReportModalClick} variant="error" fullWidth>
                Надіслати скаргу
              </Button>
            </div>
          </div>
        </section>

        <section className={styles.block}>
          {hasCoordinates ? (
            <Map
              lat={lat}
              lng={lng}
              address={data?.location?.address}
              city={data?.location?.city}
            />
          ) : (
            <div className={styles.noMap}>Карта недоступна</div>
          )}

          <div className={styles.ownerBlock}>
            <ul className={styles.list}>
              <li className={styles.listItem}>
                <strong>Місто: </strong>
                {data?.location?.city}
              </li>
              <li className={styles.listItem}>
                <strong>Вулиця: </strong>
                {data?.location?.address}
              </li>
              <li className={styles.listItem}>
                <strong>Власник:</strong> {ownerName}
              </li>
              <li className={styles.listItem}>
                <strong>Опубліковано:</strong> {DateConvertor(data.createdAt)}
              </li>
            </ul>
          </div>
        </section>
      </Container>

      <ContactsModal
        isOpen={isCallModalOpen}
        setIsOpen={setIsCallModalOpen}
        ownerName={ownerName}
        contacts={contacts}
      />

      <ReportModal
        isOpen={isReportModalOpen}
        setIsOpen={setIsReportModalOpen}
        userID={currentUser.uid}
        roomID={roomId}
      />
    </>
  )
}

export default RoomDetails
