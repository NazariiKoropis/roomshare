//styles
import styles from './UserInfo.module.scss'

//compoents
import Container from '../../../components/layout/container/Container'
import Button from '../../../components/ui/button/Button'
import EditUserInfo from './blocks/EditUserInfo'

//context
import { useAuth } from '../../../context/AuthContext'

//hooks
import { useFetch } from '../../../hooks/useFetch'

//services
import { getUserById } from './../../../services/user.service'

//react
import { useCallback, useState } from 'react'

//libs
import { ThreeDots } from 'react-loader-spinner'

//utils
import { DateConvertor } from './../../../utils/dateConvert'

function UserInfo() {
  const { currentUser } = useAuth()

  const fetchUserData = useCallback(
    () => getUserById(currentUser.uid),
    [currentUser.uid],
  )

  const { data: userData, loading } = useFetch(fetchUserData)
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)

  const onEditModalOpen = () => {
    setIsEditModalOpen(!isEditModalOpen)
  }

  if (loading || !userData) {
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
    <>
      {' '}
      <div className={styles.infoWrapper}>
        <header className={styles.header}>
          <h2>Мої дані</h2>
          <Button onClick={onEditModalOpen}>Редагувати</Button>
        </header>

        <div className={styles.profileCard}>
          <div className={styles.avatarSection}>
            <img
              src={
                userData.photoUrl ||
                'https://ui-avatars.com/api/?name=User&background=random'
              }
              alt="Аватар користувача"
              className={styles.avatar}
            />
            <div className={styles.nameBlock}>
              <h3>
                {userData.firstName} {userData.lastName}
              </h3>
              <p className={styles.role}>Користувач</p>
            </div>
          </div>

          <div className={styles.detailsGrid}>
            <div className={styles.detailItem}>
              <span>Email</span>
              <p>{userData.email}</p>
            </div>

            <div className={styles.detailItem}>
              <span>Телефон</span>
              <p>{userData.contacts?.phone || 'Не вказано'}</p>
            </div>

            <div className={styles.detailItem}>
              <span>WhatsApp</span>
              <p>{userData.contacts?.whatsapp || 'Не вказано'}</p>
            </div>

            <div className={styles.detailItem}>
              <span>Дата народження</span>
              <p>
                {userData?.birthDate
                  ? DateConvertor(userData.birthDate)
                  : 'Не вказано'}
              </p>
            </div>

            <div className={styles.detailItem}>
              <span>Стать</span>
              <p>
                {userData?.gender === 'male'
                  ? 'Чоловіча'
                  : userData?.gender === 'female'
                    ? 'Жіноча'
                    : 'Не вказано'}
              </p>
            </div>

            <div className={styles.detailItem}>
              <span>Дата реєстрації</span>
              <p>
                {userData?.registeredAt
                  ? DateConvertor(userData.registeredAt)
                  : 'Невідомо'}
              </p>
            </div>
          </div>
        </div>
      </div>
      <EditUserInfo
        isOpen={isEditModalOpen}
        onClose={onEditModalOpen}
        userId={currentUser.uid}
        onUpdateSuccess={() => window.location.reload()}
      />
    </>
  )
}

export default UserInfo
