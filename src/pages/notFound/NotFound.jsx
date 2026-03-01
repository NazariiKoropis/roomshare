//styles
import styles from './NotFound.module.scss'

//components
import Container from '../../components/layout/container/Container'

//libs
import { ThreeDots } from 'react-loader-spinner'

function NotFound() {
  return (
    <section>
      <Container styled={styles.wrapperNotFound}>
        {' '}
        <h1>Сторінку не знайдено:(</h1>
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
      </Container>
    </section>
  )
}

export default NotFound
