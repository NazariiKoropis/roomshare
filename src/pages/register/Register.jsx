//styles
import styles from './Register.module.scss'

//components
import Input from '../../components/ui/input/Input'
import Button from '../../components/ui/button/Button'
import RadioButtons from '../../components/ui/radioButton/RadioButton'
import AnimatedPage from '../../components/layout/animatedPage/AnimatedPage'
import { Logo } from '../../components/ui/svg/Logo'

//react
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom' // ДОДАНО useNavigate

//services
import { register } from '../../services/auth.service'

//libs
import { ThreeDots } from 'react-loader-spinner'

const genderOptions = [
  { label: 'Чоловік', value: 'male' },
  { label: 'Жінка', value: 'female' },
]

function Register() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    displayName: '',
    firstName: '',
    lastName: '',
    gender: '',
    phone: '',
    date: '',
    whatsapp: '',
  })

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

    const sanitizedData = {
      ...formData,
      email: formData.email.trim(),
      firstName: formData.firstName.trim(),
      lastName: formData.lastName.trim(),
      phone: formData.phone.trim(),
      whatsapp: formData.whatsapp.trim(),
    }

    const newErrors = {}

    if (!sanitizedData.email.includes('@')) {
      newErrors.email = 'Введіть коректну електронну пошту'
    }

    if (sanitizedData.password.length < 6) {
      newErrors.password = 'Пароль має бути не менше 6 символів'
    }

    if (sanitizedData.confirmPassword === '') {
      newErrors.confirmPassword = 'Підтвердіть пароль'
    } else if (sanitizedData.confirmPassword !== sanitizedData.password) {
      newErrors.confirmPassword = 'Паролі мають збігатися!'
    }

    const requiredFields = ['firstName', 'lastName', 'phone', 'gender', 'date']

    requiredFields.forEach((field) => {
      if (sanitizedData[field] === '') {
        newErrors[field] = 'Заповніть поле'
      }
    })

    if (sanitizedData.whatsapp === '') {
      newErrors.whatsapp = 'Заповніть поле'
    } else if (sanitizedData.whatsapp.length < 10) {
      newErrors.whatsapp = 'Введіть коректний номер'
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      return
    }

    const finalData = {
      ...sanitizedData,
      displayName: `${sanitizedData.firstName} ${sanitizedData.lastName}`,
    }
    setLoading(true)
    const { user, error } = await register(finalData)
    setLoading(false)
    if (error) {
      setAuthError(error)
    } else {
      console.log('Успішна реєстрація!', user)
      navigate('/')
    }
  }


  return (
    <AnimatedPage>
      <div className={styles.regPage}>
        <section className={styles.imageSection}></section>

        <section className={styles.formSection}>
          <div className={styles.formWrapper}>
            <Link to="/" className={styles.logoLink}>
              <Logo width={40} height={40} />
              <span className={styles.logoText}>
                room<span className={styles.accent}>Share</span>
              </span>
            </Link>

            <div className={styles.headerText}>
              <h1 className={styles.headerTitle}>Вітаємо</h1>
              <p>Будь ласка, введіть свої дані для реєстрації.</p>
            </div>

            {loading ? (
              <div style={{ maxWidth: '100%', margin: '0 auto' }}>
                <ThreeDots
                  height="100"
                  width="100"
                  radius="9"
                  color="var(--accent-primary)"
                  ariaLabel="Завантаження"
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
                  placeholder="name@example.com"
                />

                <fieldset className={styles.inputBlock}>
                  <legend className="visually-hidden">Паролі</legend>
                  <Input
                    label="Пароль"
                    name="password"
                    type="password"
                    value={formData.password}
                    onChange={handleChange}
                    error={errors.password}
                    placeholder="••••••••"
                  />

                  <Input
                    label="Підтвердження пароля"
                    name="confirmPassword"
                    type="password"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    error={errors.confirmPassword}
                    placeholder="••••••••"
                  />
                </fieldset>

                <fieldset className={styles.inputBlock}>
                  <legend className="visually-hidden">Ініціали</legend>
                  <Input
                    label="Ім'я"
                    name="firstName"
                    type="text"
                    value={formData.firstName}
                    onChange={handleChange}
                    error={errors.firstName}
                    placeholder="Ваше ім'я"
                  />
                  <Input
                    label="Прізвище"
                    name="lastName"
                    type="text"
                    value={formData.lastName}
                    onChange={handleChange}
                    error={errors.lastName}
                    placeholder="Ваше прізвище"
                  />
                </fieldset>

                <fieldset className={styles.inputBlock}>
                  <legend className="visually-hidden">Контактні дані</legend>
                  <Input
                    label="Телефон"
                    name="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={handleChange}
                    error={errors.phone}
                    placeholder="+380..."
                  />
                  <Input
                    label="WhatsApp"
                    name="whatsapp"
                    type="tel"
                    value={formData.whatsapp}
                    onChange={handleChange}
                    error={errors.whatsapp}
                    placeholder="+380..."
                  />
                </fieldset>

                <Input
                  type="date"
                  label="Дата народження"
                  name="date"
                  value={formData.date}
                  onChange={handleChange}
                  error={errors.date}
                />

                <RadioButtons
                  name="gender"
                  legend="Вибір статі"
                  options={genderOptions}
                  selectedValue={formData.gender}
                  onChange={handleChange}
                  errors={errors.gender}
                />

                {authError && (
                  <div
                    style={{
                      color: 'var(--error)',
                      fontSize: '14px',
                      textAlign: 'center',
                      marginTop: '8px',
                    }}
                  >
                    {authError}
                  </div>
                )}
                  <Button type="submit" variant="primary" fullWidth>
                    Зареєструватися
                  </Button>
              </form>
            )}

            <p className={styles.loginPrompt}>
              Вже маєте акаунт?{' '}
              <Link to="/login" className={styles.regLink}>
                Увійти
              </Link>
            </p>
          </div>
        </section>
      </div>
    </AnimatedPage>
  )
}

export default Register
