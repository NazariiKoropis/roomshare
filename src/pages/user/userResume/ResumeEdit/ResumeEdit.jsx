//styles
import styles from './ResumeEdit.module.scss'

//components
import Button from '../../../../components/ui/button/Button'
import Input from '../../../../components/ui/input/Input'
import TextArea from '../../../../components/ui/textArea/TextArea'

//react
import { useState } from 'react'

//services
import { updateResume, deleteResume } from '../../../../services/people.service'

function ResumeEdit({ resumeData }) {
  const [formData, setFormData] = useState({
    title: resumeData?.title || '',
    desc: resumeData?.desc || '',
    budget: resumeData?.budget || '',
    city: resumeData?.city || '',
  })

  const [errors, setErrors] = useState({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isDeleting, setIsDeleting] = useState(false)

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
    const finalData = { ...formData, budget: Number(formData.budget) }
    const success = await updateResume(resumeData.id, finalData)
    setIsSubmitting(false)

    if (success) {
      alert('Анкету успішно оновлено!')
    } else {
      alert('Помилка при оновленні.')
    }
  }

  const handleDelete = async () => {
    const isConfirmed = window.confirm(
      'Ви впевнені, що хочете видалити анкету?',
    )
    if (!isConfirmed) return

    setIsDeleting(true)
    const success = await deleteResume(resumeData.id)
    setIsDeleting(false)

    if (success) {
      window.location.reload()
    } else {
      alert('Помилка при видаленні.')
    }
  }

  return (
    <div className={styles.createWrapper}>
      <header className={styles.header}>
        <h2>Редагування анкети</h2>
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
            />
            <Input
              label="Ваш бюджет (₴)"
              name="budget"
              type="number"
              value={formData.budget}
              onChange={handleChange}
              error={errors.budget}
            />
            <Input
              label="Бажане місто"
              name="city"
              value={formData.city}
              onChange={handleChange}
              error={errors.city}
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
          <Button type="submit" fullWidth disabled={isSubmitting || isDeleting}>
            {isSubmitting ? 'Збереження...' : 'Зберегти зміни'}
          </Button>
          <Button
            type="button"
            onClick={handleDelete}
            variant="error"
            fullWidth
            disabled={isSubmitting || isDeleting}
          >
            {isDeleting ? 'Видалення...' : 'Видалити анкету'}
          </Button>
        </div>
      </form>
    </div>
  )
}

export default ResumeEdit
