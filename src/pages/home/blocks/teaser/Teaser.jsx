//styles
import styles from './Teaser.module.scss'

//components
import Container from '../../../../components/layout/container/Container'
import RoomCard from '../../../../components/shared/roomCard/roomCard'

//services
import { getRoomCards } from './../../../../services/room.service'

//react
import { useState, useEffect } from 'react'

//libs
import { ThreeDots } from 'react-loader-spinner'

//TODO: побавитися з розмірами і адаптивом
function Teaser() {
  const [rooms, setRooms] = useState([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true)
      const data = await getRoomCards()

      if (data.length > 3) {
        const finishedData = data.slice(0, 3)
        setRooms(finishedData)
      } else {
        setRooms(data)
      }

      setLoading(false)
    }

    fetchData()
  }, [])

  if (loading) {
    return (
      <Container>
        <div style={{ display: 'flex', justifyContent: 'center' }}>
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

  return (
    <section className={styles.teaserWrapper}>
      <Container>
        <h2 className={styles.teaserTitle}>Teaser</h2>

        <ul className={styles.teaserRooms}>
          {rooms.map((room) => (
            <li key={room.id}>
              {' '}
              <RoomCard room={room} />
            </li>
          ))}
        </ul>
      </Container>
    </section>
  )
}

export default Teaser
