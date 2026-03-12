//styles
import styles from './Admin.module.scss'

//components
import Container from '../../components/layout/container/Container'
import Button from '../../components/ui/button/Button'

//react
import { useState, useCallback } from 'react'
import { Link } from 'react-router-dom'

//hooks
import { useFetch } from '../../hooks/useFetch'

//services
import {
  getAllReports,
  updateReportStatus,
} from '../../services/report.service'
import { deleteRoom } from '../../services/room.service'
import { deleteResume } from '../../services/people.service'
import { logoutUser } from '../../services/auth.service' // ДОДАНО імпорт

//libs
import { ThreeDots } from 'react-loader-spinner'

//utils
import { DateConvertor } from '../../utils/dateConvert'

function Admin() {
  const [activeTab, setActiveTab] = useState('open')
  const [isProcessing, setIsProcessing] = useState(false)

  const fetchReports = useCallback(() => getAllReports(), [])
  const { data: reports, loading } = useFetch(fetchReports)

  if (loading || !reports) {
    return (
      <Container>
        <div className={styles.loaderWrapper}>
          <ThreeDots
            height="80"
            width="80"
            radius="9"
            color="var(--accent-primary)"
            visible={true}
          />
        </div>
      </Container>
    )
  }

  const filteredReports = reports.filter(
    (report) => report.status === activeTab,
  )

  const handleStatusChange = async (reportId, newStatus) => {
    setIsProcessing(true)
    const success = await updateReportStatus(reportId, newStatus)
    setIsProcessing(false)

    if (success) {
      window.location.reload()
    } else {
      alert('Помилка при оновленні статусу.')
    }
  }

  const handleDeleteTarget = async (report) => {
    const targetName = report.targetType === 'room' ? 'оголошення' : 'анкету'
    const isConfirmed = window.confirm(
      `Ви впевнені, що хочете назавжди видалити це ${targetName}? Цю дію неможливо скасувати.`,
    )

    if (!isConfirmed) return

    setIsProcessing(true)
    let deleteSuccess = false

    if (report.targetType === 'room') {
      deleteSuccess = await deleteRoom(report.targetID)
    } else if (report.targetType === 'resume') {
      deleteSuccess = await deleteResume(report.targetID)
    }

    if (deleteSuccess) {
      await updateReportStatus(report.id, 'resolved')
      window.location.reload()
    } else {
      alert(`Помилка при видаленні об'єкта. Можливо, його вже не існує.`)
      setIsProcessing(false)
    }
  }

  // ДОДАНО обробник виходу
  const handleLogout = async () => {
    await logoutUser()
  }

  return (
    <Container className={styles.adminWrapper}>
      <header className={styles.header}>
        <div className={styles.headerInfo}>
          <h2>Панель адміністратора</h2>
          <p>Керування скаргами та модерація платформи</p>
        </div>
        <Button variant="error" onClick={handleLogout}>
          Вийти з акаунта
        </Button>
      </header>

      <div className={styles.tabsContainer}>
        <button
          className={`${styles.tabBtn} ${activeTab === 'open' ? styles.activeTab : ''}`}
          onClick={() => setActiveTab('open')}
        >
          Нові скарги{' '}
          <span className={styles.badge}>
            {reports.filter((r) => r.status === 'open').length}
          </span>
        </button>
        <button
          className={`${styles.tabBtn} ${activeTab === 'resolved' ? styles.activeTab : ''}`}
          onClick={() => setActiveTab('resolved')}
        >
          Оброблені{' '}
          <span className={styles.badge}>
            {reports.filter((r) => r.status === 'resolved').length}
          </span>
        </button>
      </div>

      <div className={styles.listContainer}>
        {filteredReports.length === 0 ? (
          <div className={styles.emptyMessage}>
            <p>У цій категорії поки немає скарг.</p>
          </div>
        ) : (
          <ul className={styles.reportsList}>
            {filteredReports.map((report) => (
              <li key={report.id} className={styles.reportCard}>
                <div className={styles.cardHeader}>
                  <div className={styles.titleBlock}>
                    <span className={styles.tag}>
                      {report.targetType === 'room' ? 'Кімната' : 'Анкета'}
                    </span>
                    <h3>{report.title}</h3>
                  </div>
                  <span className={styles.date}>
                    {DateConvertor(report.createdAt)}
                  </span>
                </div>

                <div className={styles.cardBody}>
                  <p className={styles.desc}>
                    <strong>Суть скарги:</strong> {report.desc}
                  </p>
                  <p className={styles.link}>
                    <strong>Об'єкт скарги:</strong>{' '}
                    <Link
                      to={`/${report.targetType}s/${report.targetID}`}
                      target="_blank"
                    >
                      Перейти до{' '}
                      {report.targetType === 'room' ? 'оголошення' : 'анкети'} ↗
                    </Link>
                  </p>
                  <p className={styles.reporter}>
                    <strong>ID Скаржника:</strong> {report.reporterID}
                  </p>
                </div>

                <div className={styles.actions} style={{ gap: '16px' }}>
                  {report.status === 'open' ? (
                    <>
                      <Button
                        onClick={() => handleDeleteTarget(report)}
                        variant="error"
                        disabled={isProcessing}
                      >
                        Видалити оголошення
                      </Button>
                      <Button
                        onClick={() =>
                          handleStatusChange(report.id, 'resolved')
                        }
                        disabled={isProcessing}
                      >
                        Позначити як вирішено
                      </Button>
                    </>
                  ) : (
                    <Button
                      onClick={() => handleStatusChange(report.id, 'open')}
                      variant="error"
                      disabled={isProcessing}
                    >
                      Повернути на розгляд
                    </Button>
                  )}
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </Container>
  )
}

export default Admin
