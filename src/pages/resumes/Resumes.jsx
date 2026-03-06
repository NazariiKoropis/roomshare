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
import { useState, useEffect } from 'react'

function Resumes() {
  const { data, loading } = useFetch(getPeopleCards)
  const [filteredResumes, setFilteredResumes] = useState(data)

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

  const handleFilterChange = (filters) => {
    let result = data

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

    setFilteredResumes(result)
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
            <h2>Фільтри</h2>
            <Filter />
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
