//styles
import styles from './Home.module.scss'

//components
import Hero from './blocks/hero/Hero'
import HowItWorks from './blocks/howItWorks/HowItWorks'
import Teaser from './blocks/teaser/Teaser'

function Home() {
  return (
    <>
      <Hero />
      <HowItWorks />
      <Teaser />
    </>
  )
}

export default Home
