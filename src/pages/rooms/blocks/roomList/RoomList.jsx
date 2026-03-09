//styles
import styles from './RoomList.module.scss'

//components
import RoomCard from './../../../../components/shared/roomCard/RoomCard'

//react
import { useState } from 'react'

function RoomList({ rooms }) {
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 9

  if (!rooms || rooms.length === 0) {
    return (
      <div className={styles.emptyState}>
        <h3>На жаль, нічого не знайдено 😔</h3>
        <p>Спробуйте змінити параметри пошуку або завітайте пізніше.</p>
      </div>
    )
  }

  const totalPages = Math.ceil(rooms.length / itemsPerPage)

  const indexOfLastItem = currentPage * itemsPerPage
  const indexOfFirstItem = indexOfLastItem - itemsPerPage

  const currentApartments = rooms.slice(indexOfFirstItem, indexOfLastItem)

  const handlePrevPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1)
  }

  const handleNextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1)
  }

  return (
    <section>
      <h2 className="visually-hidden">Список кімнат</h2>

      <ul className={styles.roomListWrapper}>
        {currentApartments.map((item) => (
          <li key={item.id}>
            <RoomCard room={item} />
          </li>
        ))}
      </ul>

      {totalPages > 1 && (
        <div className={styles.pagination}>
          <button
            className={styles.pageBtn}
            onClick={handlePrevPage}
            disabled={currentPage === 1}
          >
            Попередня
          </button>

          <div className={styles.pageNumbers}>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map(
              (pageNumber) => (
                <button
                  key={pageNumber}
                  className={`${styles.pageNumberBtn} ${currentPage === pageNumber ? styles.activePage : ''}`}
                  onClick={() => setCurrentPage(pageNumber)}
                >
                  {pageNumber}
                </button>
              ),
            )}
          </div>

          <button
            className={styles.pageBtn}
            onClick={handleNextPage}
            disabled={currentPage === totalPages}
          >
            Наступна
          </button>
        </div>
      )}
    </section>
  )
}

export default RoomList
