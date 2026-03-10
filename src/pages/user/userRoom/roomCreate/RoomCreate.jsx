//styles
import styles from './RoomCreate.module.scss'

//components
import Button from './../../../../components/ui/button/Button'
import Input from './../../../../components/ui/input/Input'
import TextArea from './../../../../components/ui/textArea/TextArea'
import CheckBoxGroup from './../../../../components/ui/checkBoxGroup/CheckBoxGroup'

//react
import { useState } from 'react'

//services
import { createRoom } from '../../../../services/room.service'

const AMENITIES_OPTIONS = [
  'WiFi',
  'Балкон',
  'Пральна машина',
  'Кондиціонер',
  'Телевізор',
  'Можна з тваринами',
  'Духовка',
]

function RoomCreate({ userId }) {
  const [formData, setFormData] = useState({
    title: '',
    desc: '',
    location: {
      address: '',
      city: '',
      lat: '',
      lng: '',
    },
    price: '',
    amenities: [],
  })

  const [errors, setErrors] = useState({})
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleChange = (e) => {
    const { name, value } = e.target

    if (['address', 'city', 'lat', 'lng'].includes(name)) {
      setFormData((prev) => ({
        ...prev,
        location: { ...prev.location, [name]: value },
      }))

      setErrors((prev) => ({
        ...prev,
        location: { ...prev.location, [name]: '' },
      }))
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }))
      setErrors((prev) => ({ ...prev, [name]: '' }))
    }
  }

  const handleAmenityToggle = (amenity) => {
    setFormData((prev) => {
      const isSelected = prev.amenities.includes(amenity)
      if (isSelected) {
        return {
          ...prev,
          amenities: prev.amenities.filter((a) => a !== amenity),
        }
      } else {
        return { ...prev, amenities: [...prev.amenities, amenity] }
      }
    })
  }

  const onSubmit = async (e) => {
    e.preventDefault()
    const newErrors = { location: {} }
    let hasError = false

    if (!formData.title.trim()) {
      newErrors.title = 'Введіть заголовок'
      hasError = true
    }
    if (!formData.price) {
      newErrors.price = 'Введіть ціну'
      hasError = true
    }
    if (!formData.location.city.trim()) {
      newErrors.location.city = 'Введіть місто'
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
      price: Number(formData.price),
      slug: generatedSlug,
      userID: userId,
      createdAt: Date.now(),
      status: 'active',
    }

    const success = await createRoom(finalData)

    setIsSubmitting(false)

    if (success) {
      console.log('Кімнату успішно створено!', finalData)

      window.location.reload()
    } else {
      alert('Виникла помилка при створенні кімнати. Спробуйте ще раз.')
    }
  }

  const onResetFormClick = () => {
    setFormData({
      title: '',
      desc: '',
      price: '',
      location: { address: '', city: '', lat: '', lng: '' },
      amenities: [],
    })
    setErrors({})
  }

  return (
    <div className={styles.createWrapper}>
      <header className={styles.header}>
        <h2>Створіть власну кімнату</h2>
      </header>

      <form onSubmit={onSubmit} className={styles.formWrapper}>
        <div className={styles.formContent}>
          <div className={styles.column}>
            <fieldset>
              <legend className="visually-hidden">Заголовок і ціна</legend>
              <Input
                label="Введіть заголовок"
                name="title"
                value={formData.title}
                onChange={handleChange}
                error={errors.title}
                placeholder="Кімната з балконом"
              />

              <Input
                label="Введіть ціну (₴)"
                name="price"
                type="number"
                value={formData.price}
                onChange={handleChange}
                error={errors.price}
                placeholder="5000"
              />
            </fieldset>

            <fieldset>
              <legend className="visually-hidden">Опис</legend>
              <TextArea
                label="Введіть опис"
                name="desc"
                value={formData.desc}
                onChange={handleChange}
              />
            </fieldset>
          </div>

          <div className={styles.column}>
            <fieldset>
              <legend className="visually-hidden">Локація</legend>
              <Input
                label="Місто"
                name="city"
                value={formData.location.city}
                onChange={handleChange}
                error={errors.location?.city}
              />
              <Input
                label="Адреса"
                name="address"
                value={formData.location.address}
                onChange={handleChange}
              />
              <div style={{ display: 'flex', gap: '16px' }}>
                <Input
                  label="Широта"
                  name="lat"
                  value={formData.location.lat}
                  onChange={handleChange}
                />
                <Input
                  label="Довгота"
                  name="lng"
                  value={formData.location.lng}
                  onChange={handleChange}
                />
              </div>
            </fieldset>

            <CheckBoxGroup
              label="Зручності в кімнаті"
              name="amenities"
              values={AMENITIES_OPTIONS}
              selectedValues={formData.amenities}
              onChange={handleAmenityToggle}
            />
          </div>
        </div>

        <div style={{ display: 'flex', gap: '16px', marginTop: '24px' }}>
          <Button type="submit" fullWidth disabled={isSubmitting}>
            {isSubmitting ? 'Створення...' : 'Створити'}
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

export default RoomCreate
