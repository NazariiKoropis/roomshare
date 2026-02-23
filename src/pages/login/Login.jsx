//styles
import styles from './Login.module.scss'

//components
import Input from '../../components/ui/input/Input'
import Button from './../../components/ui/button/Button'
import AnimatedPage from '../../components/layout/animatedPage/AnimatedPage'

import { Logo } from '../../components/ui/svg/Logo'
//react
import { useState } from 'react'
import { Link } from 'react-router-dom'

function Login() {
  const [formData, setFormData] = useState({ email: '', password: '' })
  const [errors, setErrors] = useState({})

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))

    setErrors((prev) => ({ ...prev, [name]: '' }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    const newErrors = {}
    if (!formData.email.includes('@')) {
      newErrors.email = 'Введіть коректний email'
    }
    if (formData.password.length < 6) {
      newErrors.password = 'Пароль має бути не менше 6 символів'
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      return
    }

    console.log('Дані готові до відправки:', formData)
  }

  return (
    <AnimatedPage>
      {' '}
      <main className={styles.loginPage}>
        <section className={styles.formSection}>
          <div className={styles.formWrapper}>
            <Link to="/" className={styles.logoLink}>
              <Logo width={40} height={40} />
              <span className={styles.logoText}>
                room<span className={styles.accent}>Share</span>
              </span>
            </Link>

            <div className={styles.headerText}>
              <h1>З поверненням!</h1>
              <p>Будь ласка, введіть свої дані для входу.</p>
            </div>

            <form className={styles.form} onSubmit={handleSubmit}>
              <Input
                label="Email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                error={errors.email}
                placeholder="Введіть ваш email"
              />

              <Input
                label="Пароль"
                name="password"
                type="password"
                value={formData.password}
                onChange={handleChange}
                error={errors.password}
                placeholder="••••••••"
              />

              <Button type="submit" variant="primary" fullWidth>
                Увійти
              </Button>
            </form>

            <p className={styles.registerPrompt}>
              Ще не маєте акаунту?{' '}
              <Link to="/register" className={styles.regLink}>
                Зареєструватися
              </Link>
            </p>
          </div>
        </section>

        <section className={styles.imageSection}></section>
      </main>{' '}
    </AnimatedPage>
  )
}

export default Login
