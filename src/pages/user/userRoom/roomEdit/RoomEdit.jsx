//styles
import styles from './RoomEdit.module.scss'

//components
import Button from './../../../../components/ui/button/Button'
import Input from './../../../../components/ui/input/Input'
import TextArea from './../../../../components/ui/textArea/TextArea'
import CheckBoxGroup from './../../../../components/ui/checkBoxGroup/CheckBoxGroup'

//react
import { useState } from 'react'

//services
import { updateRoom, deleteRoom } from '../../../../services/room.service'

const AMENITIES_OPTIONS = [
  'WiFi',
  'Балкон',
  'Пральна машина',
  'Кондиціонер',
  'Телевізор',
  'Можна з тваринами',
  'Духовка',
]

function RoomEdit({ roomData }) {
  const [formData, setFormData] = useState({
    title: roomData?.title || '',
    desc: roomData?.desc || '',
    location: {
      address: roomData?.location?.address || '',
      city: roomData?.location?.city || '',
      lat: roomData?.location?.lat || '',
      lng: roomData?.location?.lng || '',
    },
    price: roomData?.price || '',
    amenities: roomData?.amenities || [],
  })

  const [errors, setErrors] = useState({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isDeleting, setIsDeleting] = useState(false)

  const handleChange = (e) => {
    const { name, value } = e.target

    if (['address', 'city', 'lat', 'lng'].includes(name)) {
      setFormData((prev) => ({
        ...prev,
        location: { ...prev.location, [name]: value },
      }))
      setErrors((prev) => ({
        ...prev,
        location: { ...(prev.location || {}), [name]: '' },
      }))
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }))
      setErrors((prev) => ({ ...prev, [name]: '' }))
    }
  }

  const handleAmenityToggle = (amenity) => {
    setFormData((prev) => {
      const currentAmenities = prev.amenities || []
      const isSelected = currentAmenities.includes(amenity)

      if (isSelected) {
        return {
          ...prev,
          amenities: currentAmenities.filter((a) => a !== amenity),
        }
      } else {
        return { ...prev, amenities: [...currentAmenities, amenity] }
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

    const finalData = {
      ...formData,
      price: Number(formData.price),
    }

    const success = await updateRoom(roomData.id, finalData)

    setIsSubmitting(false)

    if (success) {
      alert('Дані кімнати успішно оновлено!')
    } else {
      alert('Виникла помилка при оновленні. Спробуйте ще раз.')
    }
  }

  const handleDelete = async () => {
    const isConfirmed = window.confirm(
      'Ви впевнені, що хочете видалити це оголошення? Цю дію неможливо скасувати.',
    )

    if (!isConfirmed) return

    setIsDeleting(true)
    const success = await deleteRoom(roomData.id)
    setIsDeleting(false)

    if (success) {
      window.location.reload()
    } else {
      alert('Виникла помилка при видаленні.')
    }
  }

  return (
    <div className={styles.createWrapper}>
      <header className={styles.header}>
        <h2>Редагування кімнати</h2>
      </header>

      <form onSubmit={onSubmit} className={styles.formWrapper}>
        <div className={styles.formContent}>
          <div className={styles.column}>
            <fieldset>
              <legend className="visually-hidden">Заголовок і ціна</legend>
              <Input
                label="Заголовок оголошення"
                name="title"
                value={formData.title}
                onChange={handleChange}
                error={errors.title}
              />

              <Input
                label="Ціна (₴)"
                name="price"
                type="number"
                value={formData.price}
                onChange={handleChange}
                error={errors.price}
              />
            </fieldset>

            <fieldset>
              <legend className="visually-hidden">Опис</legend>
              <TextArea
                label="Опис кімнати"
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
              selectedValues={formData.amenities || []}
              onChange={handleAmenityToggle}
            />
          </div>
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
            {isDeleting ? 'Видалення...' : 'Видалити кімнату'}
          </Button>
        </div>
      </form>
    </div>
  )
}

export default RoomEdit
