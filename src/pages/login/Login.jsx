//styles
import styles from './Login.module.scss'

//components
import Input from '../../components/ui/input/Input'
import Button from './../../components/ui/button/Button'
import AnimatedPage from '../../components/layout/animatedPage/AnimatedPage'
import { Logo } from '../../components/ui/svg/Logo'

//react
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

//services
import { login } from './../../services/auth.service'
import { getUserRoleById } from './../../services/user.service'

//libs
import { ThreeDots } from 'react-loader-spinner'

function Login() {
  const [formData, setFormData] = useState({ email: '', password: '' })
  const [errors, setErrors] = useState({})
  const [authError, setAuthError] = useState('')
  const [loading, setLoading] = useState(false)

  const navigate = useNavigate()

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
    setErrors((prev) => ({ ...prev, [name]: '' }))
    setAuthError('')
  }

  const handleSubmit = async (e) => {
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

    setLoading(true)
    const { user, error } = await login(formData.email, formData.password)
    setLoading(false)
    if (error) {
      setAuthError(error)
    } else {
      console.log('Успішний вхід:', user)

      try {
        const role = await getUserRoleById(user.uid)
        navigate(role ? `/${role}` : '/')
      } catch (err) {
        console.error('Could not fetch role on login, sending to home', err)
        navigate('/')
      }
    }
  }

  const handleFillTestData = () => {
    setFormData({
      email: 'vasil@crutoi.com',
      password: '12345678',
    })
    setErrors({})
    setAuthError('')
  }

  return (
    <AnimatedPage>
      <div className={styles.loginPage}>
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

            {loading ? (
              <div style={{ maxWidth: '100%', margin: '0 auto' }}>
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
              </div>
            ) : (
              <form className={styles.form} onSubmit={handleSubmit}>
                <Input
                  label="Електронна пошта"
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

                {authError && (
                  <div
                    style={{
                      color: 'var(--error)',
                      fontSize: '14px',
                      textAlign: 'center',
                    }}
                  >
                    {authError}
                  </div>
                )}

                <Button
                  type="button"
                  onClick={handleFillTestData}
                  variant="primary"
                  fullWidth
                >
                  test admin
                </Button>

                <Button type="submit" variant="primary" fullWidth>
                  Увійти
                </Button>
              </form>
            )}

            <p className={styles.registerPrompt}>
              Ще не маєте акаунту?{' '}
              <Link to="/register" className={styles.regLink}>
                Зареєструватися
              </Link>
            </p>
          </div>
        </section>

        <section className={styles.imageSection}></section>
      </div>
    </AnimatedPage>
  )
}

export default Login
