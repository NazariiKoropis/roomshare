//styles
import styles from './RequestCard.module.scss'

//components
import Button from './../../../../components/ui/button/Button'

//react
import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

//services
import { getUserById } from './../../../../services/user.service'
import { getRoomById } from './../../../../services/room.service'
import { getPeopleCardById } from './../../../../services/people.service'
import {
  updateRequestStatus,
  deleteRequest,
} from './../../../../services/request.service'

//utils
import { DateConvertor } from './../../../../utils/dateConvert'

function RequestCard({ request, type, onUpdate }) {
  const [otherUser, setOtherUser] = useState(null)
  const [targetData, setTargetData] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const [isProcessing, setIsProcessing] = useState(false)

  const otherUserId =
    type === 'incoming' ? request.userId_sent : request.userId_received

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userData = await getUserById(otherUserId)
        setOtherUser(userData)

        let target = null
        if (request.targetType === 'room') {
          target = await getRoomById(request.targetID)
        } else if (request.targetType === 'resume') {
          target = await getPeopleCardById(request.targetID)
        }
        setTargetData(target)
      } catch (error) {
        console.error('Помилка завантаження даних для картки', error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchData()
  }, [otherUserId, request.targetID, request.targetType])

  const handleAccept = async () => {
    setIsProcessing(true)
    const success = await updateRequestStatus(request.id, 'accepted')
    if (success) onUpdate()
    setIsProcessing(false)
  }

  const handleDecline = async () => {
    setIsProcessing(true)
    const success = await updateRequestStatus(request.id, 'declined')
    if (success) onUpdate()
    setIsProcessing(false)
  }

  const handleDelete = async () => {
    const isConfirmed = window.confirm(
      'Ви впевнені, що хочете видалити цю заявку?',
    )
    if (!isConfirmed) return

    setIsProcessing(true)
    const success = await deleteRequest(request.id)
    if (success) onUpdate()
    setIsProcessing(false)
  }

  if (isLoading || !otherUser) {
    return <div className={styles.skeletonCard}>Завантаження деталей...</div>
  }

  const statusConfig = {
    pending: { label: 'На розгляді', colorClass: styles.statusPending },
    accepted: { label: 'Прийнято', colorClass: styles.statusAccepted },
    declined: { label: 'Відхилено', colorClass: styles.statusDeclined },
  }

  const currentStatus = statusConfig[request.status]

  return (
    <div className={styles.card}>
      <div className={styles.header}>
        <div className={styles.userInfo}>
          <img
            src={otherUser.photoUrl || 'https://ui-avatars.com/api/?name=User'}
            alt="Аватар"
            className={styles.avatar}
          />
          <div>
            <h4>
              {otherUser.firstName} {otherUser.lastName}
            </h4>
            <span className={styles.date}>
              {DateConvertor(request.createdAt)}
            </span>
          </div>
        </div>
        <div className={`${styles.badge} ${currentStatus.colorClass}`}>
          {currentStatus.label}
        </div>
      </div>

      <div className={styles.body}>
        {targetData && (
          <p className={styles.targetLink}>
            Стосується:{' '}
            <Link to={`/${request.targetType}s/${request.targetID}`}>
              {targetData.title}
            </Link>
          </p>
        )}
        <div className={styles.messageBlock}>
          <p>{request.message}</p>
        </div>
      </div>

      {request.status === 'accepted' && (
        <div className={styles.contactsBlock}>
          <h5>Контактні дані для зв'язку:</h5>
          <p>
            📞 Телефон: <span>{otherUser.contacts?.phone || 'Не вказано'}</span>
          </p>
          <p>
            💬 WhatsApp:{' '}
            <span>{otherUser.contacts?.whatsapp || 'Не вказано'}</span>
          </p>
        </div>
      )}

      <div className={styles.actions}>
        {type === 'incoming' && request.status === 'pending' && (
          <>
            <Button onClick={handleAccept} disabled={isProcessing}>
              Прийняти
            </Button>
            <Button
              onClick={handleDecline}
              variant="error"
              disabled={isProcessing}
            >
              Відхилити
            </Button>
          </>
        )}

        {type === 'outgoing' && (
          <Button
            onClick={handleDelete}
            variant="error"
            disabled={isProcessing}
          >
            Скасувати заявку
          </Button>
        )}
      </div>
    </div>
  )
}

export default RequestCard
