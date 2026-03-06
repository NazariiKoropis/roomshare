//styles
import styles from './Resumes.module.scss'

//components
import Container from '../../components/layout/container/Container'
import Hero from '../../components/layout/Hero/Hero'
import ResumesList from './blocks/resumesList/ResumesList'
import Filter from './blocks/filter/Filter'

//hooks
import { useFetch } from '../../hooks/useFetch'

//services
import { getPeopleCards } from './../../services/people.service'

//libs
import { ThreeDots } from 'react-loader-spinner'

//react
import { useState, useCallback } from 'react'

function Resumes() {
  const { data, loading } = useFetch(getPeopleCards)

  const [activeFilters, setActiveFilters] = useState({})

  const handleFilterChange = useCallback((filters) => {
    setActiveFilters(filters)
  }, [])

  const filteredResumes = (data || []).filter((resume) => {
    if (activeFilters.name) {
      if (
        !resume.displayName
          ?.toLowerCase()
          .includes(activeFilters.name.toLowerCase())
      ) {
        return false
      }
    }

    if (activeFilters.budget) {
      if (resume.budget < activeFilters.budget) return false
    }

    if (activeFilters.city) {
      if (resume.city !== activeFilters.city) return false
    }

    if (activeFilters.gender) {
      if (resume.gender !== activeFilters.gender) return false
    }

    return true
  })

  if (loading) {
    return (
      <Container>
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            marginTop: '60px',
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
      <Hero
        title={'Кандидати'}
        text={'Знайдіть ідеального сусіда для спільної оренди'}
      />
      <Container>
        <div className={styles.gridWrapper}>
          <aside className={styles.sidebar}>
            <Filter onFilterChange={handleFilterChange} />
          </aside>

          <div className={styles.listArea}>
            <ResumesList resumes={filteredResumes} />
          </div>
        </div>
      </Container>
    </>
  )
}

export default Resumes
