//styles
import styles from './UserRoom.module.scss'

//components
import RoomCreate from './roomCreate/RoomCreate'
import RoomEdit from './roomEdit/RoomEdit'

//context
import { useAuth } from './../../../context/AuthContext'

//hooks
import { useFetch } from '../../../hooks/useFetch'

//services
import { getRoomByUserId } from '../../../services/room.service'

//react
import { useCallback } from 'react'

//libs
import { ThreeDots } from 'react-loader-spinner'

function UserRoom() {
  const { currentUser } = useAuth()

  const fetchUserRoom = useCallback(
    () => getRoomByUserId(currentUser.uid),
    [currentUser.uid],
  )

  const { data: roomData, loading } = useFetch(fetchUserRoom)

  if (loading) {
    return (
      <div className={styles.loaderWrapper}>
        <ThreeDots
          height="80"
          width="80"
          radius="9"
          color="var(--accent-primary)"
          visible={true}
        />
      </div>
    )
  }

  return (
    <div className={styles.wrapper}>
      {roomData ? (
        <RoomEdit roomData={roomData} />
      ) : (
        <RoomCreate userId={currentUser.uid} />
      )}
    </div>
  )
}

export default UserRoom
