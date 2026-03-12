//styles
import styles from './UserRequests.module.scss'

//react
import { useState, useCallback } from 'react'

//context
import { useAuth } from '../../../context/AuthContext'

//hooks
import { useFetch } from '../../../hooks/useFetch'

//services
import { getRequestsByField } from '../../../services/request.service'

//libs
import { ThreeDots } from 'react-loader-spinner'

//componets
import RequestCard from './requestCard/RequestCard'

function UserRequests() {
  const { currentUser } = useAuth()
  const [activeTab, setActiveTab] = useState('incoming')

  const fetchAllRequests = useCallback(async () => {
    const incoming = await getRequestsByField(
      'userId_received',
      currentUser.uid,
    )
    const outgoing = await getRequestsByField('userId_sent', currentUser.uid)
    return { incoming, outgoing }
  }, [currentUser.uid])

  const { data: requests, loading } = useFetch(fetchAllRequests)

  if (loading || !requests) {
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

  const currentList =
    activeTab === 'incoming' ? requests.incoming : requests.outgoing

  const handleUpdate = () => {
    window.location.reload()
  }

  return (
    <div className={styles.requestsWrapper}>
      <header className={styles.header}>
        <h2>Мої заявки</h2>
      </header>

      <div className={styles.tabsContainer}>
        <button
          className={`${styles.tabBtn} ${activeTab === 'incoming' ? styles.activeTab : ''}`}
          onClick={() => setActiveTab('incoming')}
        >
          Вхідні заявки{' '}
          <span className={styles.badge}>{requests.incoming.length}</span>
        </button>
        <button
          className={`${styles.tabBtn} ${activeTab === 'outgoing' ? styles.activeTab : ''}`}
          onClick={() => setActiveTab('outgoing')}
        >
          Надіслані{' '}
          <span className={styles.badge}>{requests.outgoing.length}</span>
        </button>
      </div>

      <div className={styles.listContainer}>
        {currentList.length === 0 ? (
          <p className={styles.emptyMessage}>
            У вас поки немає{' '}
            {activeTab === 'incoming' ? 'вхідних' : 'надісланих'} заявок.
          </p>
        ) : (
          <ul className={styles.requestsList}>
            {currentList.map((req) => (
              <li key={req.id}>
                <RequestCard
                  request={req}
                  type={activeTab}
                  onUpdate={handleUpdate}
                />
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  )
}

export default UserRequests
