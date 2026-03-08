//styles
import styles from './RoomDetails.module.scss'

//components
import Container from './../../components/layout/container/Container'
import Button from './../../components/ui/button/Button'
import Hero from './../../components/layout/Hero/Hero'
import Map from './blocks/Map'

//react
import { useEffect, useState, useCallback } from 'react'
import { useParams } from 'react-router-dom'

//hooks
import { useFetch } from './../../hooks/useFetch'

//services
import { getRoomById } from './../../services/room.service'
import { getUserDisplayNameById } from './../../services/user.service'

//loader
import { ThreeDots } from 'react-loader-spinner'

//utils
import { getRoomImage } from '../../utils/imagesUtil'
import { DateConvertor } from './../../utils/dateConvert'

function RoomDetails() {
  const { roomId } = useParams()

  const fetchData = useCallback(() => getRoomById(roomId), [roomId])

  const [ownerName, setOwnerName] = useState('Завантаження...')
  const { data, loading } = useFetch(fetchData)

  useEffect(() => {
    if (data?.userID) {
      const fetchOwner = async () => {
        const name = await getUserDisplayNameById(data?.userID)
        setOwnerName(name || 'Невідомий користувач')
      }
      fetchOwner()
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
            ariaLabel="three-dots-loading"
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
        <section>
          <article>
            <img
              src={getRoomImage(data.slug) || getRoomImage('default')}
              alt={data.desc}
            />
          </article>
          <div>
            {' '}
            <h2>{data.title}</h2>
            <p>{data.desc}</p>
            <p>{data.price} ₴ / місяць</p>
            <div className={styles.amenities}>
              <h3>Зручності:</h3>
              <ul>
                {data.amenities?.length > 0 ? (
                  data.amenities.map((item) => <li key={item}>{item}</li>)
                ) : (
                  <li>Інформація відсутня</li>
                )}
              </ul>
            </div>
            <Button>Дзвонити</Button>
          </div>
        </section>

        <section>
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
            <ul className={styles.metaList}>
              <li>
                <strong>Власник:</strong> {ownerName}
              </li>
              <li>
                <strong>Опубліковано:</strong> {DateConvertor(data.createdAt)}
              </li>
            </ul>
          </div>
        </section>
      </Container>
    </>
  )
}

export default RoomDetails
