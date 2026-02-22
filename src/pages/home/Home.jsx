//styles
import styles from './Home.module.scss'

//components
import Container from '../../components/layout/container/Container'
import Input from '../../components/ui/input/Input'

//react
import { useState } from 'react'

function Home() {
  const [value, setValue] = useState('')
  const handleChangeValue = (e) => {
    setValue(e.target.value)
  }
  return (
    <Container>
      <h2>roomshare</h2>
      <Input
        name={'email'}
        label={'Login'}
        value={value}
        onChange={handleChangeValue}
      />
    </Container>
  )
}

export default Home
