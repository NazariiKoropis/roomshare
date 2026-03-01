//styles
import styles from './Rooms.module.scss'

//components
import Hero from './blocks/Hero/Hero'
import RoomList from './blocks/roomList/RoomList'
import Container from '../../components/layout/container/Container'

//services
import { getRoomCards } from './../../services/room.service'

//react
import { useState, useEffect } from 'react'

//libs
import { ThreeDots } from 'react-loader-spinner'
import Filter from './blocks/filter/Filter'

function Rooms() {
  const [allRooms, setAllRooms] = useState([])
  const [filteredRooms, setFilteredRooms] = useState([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true)
      const data = await getRoomCards()

      setAllRooms(data)
      setFilteredRooms(data)
      setLoading(false)
    }

    fetchData()
  }, [])

  const handleFilterChange = (filters) => {
    let result = allRooms

    if (filters.name) {
      result = result.filter((room) =>
        room.title.toLowerCase().includes(filters.name.toLowerCase()),
      )
    }

    if (filters.city) {
      result = result.filter((room) => room.location?.city === filters.city)
    }

    if (filters.amenities.length > 0) {
      result = result.filter((room) =>
        filters.amenities.every((amenity) => room.amenities?.includes(amenity)),
      )
    }

    setFilteredRooms(result)
  }

  if (loading) {
    return (
      <Container>
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            marginTop: '100px',
          }}
        >
          <ThreeDots
            height="100"
            width="100"
            radius="9"
            color="var(--accent-primary)"
            ariaLabel="three-dots-loading"
            visible={true}
          />
        </div>
      </Container>
    )
  }

  return (
    <>
      <Hero />
      <Container>
        <div className={styles.contentWrapper}>
          <aside className={styles.sidebar}>
            <Filter onFilterChange={handleFilterChange} />
          </aside>

          <div className={styles.listArea}>
            <RoomList rooms={filteredRooms} />
          </div>
        </div>
      </Container>
    </>
  )
}

export default Rooms
