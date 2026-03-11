//styles
import styles from './ResumeCreate.module.scss'

//components
import Button from '../../../../components/ui/button/Button'
import Input from '../../../../components/ui/input/Input'
import TextArea from '../../../../components/ui/textArea/TextArea'

//react
import { useState } from 'react'

//services
import { createResume } from '../../../../services/people.service'

function ResumeCreate({ userId }) {
  const [formData, setFormData] = useState({
    title: '',
    desc: '',
    budget: '',
    city: '',
  })

  const [errors, setErrors] = useState({})
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
    setErrors((prev) => ({ ...prev, [name]: '' }))
  }

  const onSubmit = async (e) => {
    e.preventDefault()
    const newErrors = {}
    let hasError = false

    if (!formData.title.trim()) {
      newErrors.title = 'Введіть заголовок'
      hasError = true
    }
    if (!formData.budget) {
      newErrors.budget = 'Введіть бюджет'
      hasError = true
    }
    if (!formData.city.trim()) {
      newErrors.city = 'Введіть місто'
      hasError = true
    }

    if (hasError) {
      setErrors(newErrors)
      return
    }

    setIsSubmitting(true)

    const generatedSlug = `${formData.title.toLowerCase().replace(/\s+/g, '-')}-${Date.now()}`

    const finalData = {
      ...formData,
      budget: Number(formData.budget),
      slug: generatedSlug,
      userID: userId,
      createdAt: Date.now(),
      status: 'active',
    }

    const success = await createResume(finalData)

    setIsSubmitting(false)

    if (success) {
      window.location.reload()
    } else {
      alert('Помилка при створенні анкети.')
    }
  }

  const onResetFormClick = () => {
    setFormData({ title: '', desc: '', budget: '', city: '' })
    setErrors({})
  }

  return (
    <div className={styles.createWrapper}>
      <header className={styles.header}>
        <h2>Створіть анкету для пошуку співмешканців</h2>
      </header>

      <form onSubmit={onSubmit} className={styles.formWrapper}>
        <div className={styles.formContent}>
          <fieldset>
            <legend className="visually-hidden">Основна інформація</legend>
            <Input
              label="Заголовок анкети"
              name="title"
              value={formData.title}
              onChange={handleChange}
              error={errors.title}
              placeholder="Шукаю кімнату..."
            />
            <Input
              label="Ваш бюджет (₴)"
              name="budget"
              type="number"
              value={formData.budget}
              onChange={handleChange}
              error={errors.budget}
              placeholder="5000"
            />
            <Input
              label="Бажане місто"
              name="city"
              value={formData.city}
              onChange={handleChange}
              error={errors.city}
              placeholder="Київ"
            />
          </fieldset>

          <fieldset>
            <legend className="visually-hidden">Про себе</legend>
            <TextArea
              label="Розкажіть про себе"
              name="desc"
              value={formData.desc}
              onChange={handleChange}
            />
          </fieldset>
        </div>

        <div style={{ display: 'flex', gap: '16px', marginTop: '24px' }}>
          <Button type="submit" fullWidth disabled={isSubmitting}>
            {isSubmitting ? 'Створення...' : 'Опублікувати'}
          </Button>
          <Button
            type="button"
            onClick={onResetFormClick}
            variant="error"
            fullWidth
            disabled={isSubmitting}
          >
            Очистити
          </Button>
        </div>
      </form>
    </div>
  )
}

export default ResumeCreate
