//styles
import styles from './ResumesList.module.scss'

//components
import PeopleCard from './../../../../components/shared/peopleCard/PeopleCard'

//react
import { useState } from 'react'

function ResumesList({ resumes }) {
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 5

  if (!resumes || resumes.length === 0) {
    return (
      <section className={styles.emptyState}>
        <h3>Поки що немає жодного резюме 😔</h3>
        <p>Але ви можете стати першим!</p>
      </section>
    )
  }

  const totalPages = Math.ceil(resumes.length / itemsPerPage)

  const indexOfLastItem = currentPage * itemsPerPage
  const indexOfFirstItem = indexOfLastItem - itemsPerPage

  const currentResumes = resumes.slice(indexOfFirstItem, indexOfLastItem)

  const handlePrevPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1)
  }

  const handleNextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1)
  }

  return (
    <section>
      <h2 className={styles.title}>Останні резюме</h2>

      <ul className={styles.listGrid}>
        {currentResumes.map((item) => (
          <li key={item.id}>
            <PeopleCard person={item} />
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

export default ResumesList
