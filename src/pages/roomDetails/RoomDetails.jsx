//styles
import styles from './RoomDetails.module.scss'

import Container from './../../components/layout/container/Container'
import { useParams } from 'react-router-dom'

function RoomDetails() {
  const { roomId } = useParams()

  return (
    <>
      <Container>
        <h2>{roomId}</h2>
      </Container>
    </>
  )
}

export default RoomDetails
