//components
import Modal from '../../../../components/ui/modal/Modal'
import Button from '../../../../components/ui/button/Button'
import Input from './../../../../components/ui/input/Input'

//react
import { useState } from 'react' // removed useEffect, wasn't used

//services
import { setUserNewData } from '../../../../services/user.service' // IMPORT THIS

function EditUserInfo({ isOpen, onClose, userId, onUpdateSuccess }) {
  const [newNumber, setNewNumber] = useState('')
  const [newWhatsApp, setNewWhatsApp] = useState('')
  const [newPhotoURL, setNewPhotoURL] = useState('')
  const [errors, setErrors] = useState({})
  const [isSubmitting, setIsSubmitting] = useState(false)

  const onNewNumberChange = (e) => setNewNumber(e.target.value)
  const onNewWhatsAppChange = (e) => setNewWhatsApp(e.target.value)
  const onNewPhotoURLChange = (e) => setNewPhotoURL(e.target.value)

  const onDataSubmit = async (e) => {
    e.preventDefault()
    const newErrors = {}

    const trimmedNumber = newNumber.trim()
    const trimmedWhatsApp = newWhatsApp.trim()
    const trimmedPhotoURL = newPhotoURL.trim()

    if (!trimmedNumber && !trimmedWhatsApp && !trimmedPhotoURL) {
      setErrors({ form: 'Заповніть поля' })
      return
    }

    if (trimmedNumber && trimmedNumber.length < 10) {
      newErrors.phone = 'Номер занадто короткий'
    }

    if (trimmedWhatsApp && trimmedWhatsApp.length < 10) {
      newErrors.whatsapp = 'Номер занадто короткий'
    }

    if (trimmedPhotoURL && !trimmedPhotoURL.includes('https://')) {
      newErrors.URL = 'Вкажіть правильне посилання (https://...)'
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      return
    }

    setErrors({})
    setIsSubmitting(true)

    const data = {}
    if (trimmedNumber) data.phone = trimmedNumber
    if (trimmedWhatsApp) data.whatsapp = trimmedWhatsApp
    if (trimmedPhotoURL) data.photoUrl = trimmedPhotoURL

    const success = await setUserNewData(userId, data)

    setIsSubmitting(false)

    if (success) {
      console.log('Дані успішно оновлено!')
      onUpdateSuccess()
      onModalClose()
    } else {
      setErrors({ form: 'Помилка при збереженні даних' })
    }
  }
  const onModalClose = () => {
    setNewNumber('')
    setNewWhatsApp('')
    setNewPhotoURL('')
    setErrors({})
    onClose()
  }

  return (
    <Modal isOpen={isOpen} onClose={onModalClose} title={'Оновити дані'}>
      <form
        onSubmit={onDataSubmit}
        style={{
          display: 'flex',
          justifyContent: 'center',
          flexDirection: 'column',
          gap: '16px',
        }}
      >
        {errors.form && <p style={{ color: 'red' }}>{errors.form}</p>}

        <Input
          type="tel"
          name={'number'}
          label={'Ваш новий номер телефону'}
          value={newNumber}
          onChange={onNewNumberChange}
          error={errors.phone}
          placeholder="+380..."
        />

        <Input
          type="tel"
          name={'whatsapp'}
          label={'Ваш новий WhatsApp'}
          value={newWhatsApp}
          onChange={onNewWhatsAppChange}
          error={errors.whatsapp}
          placeholder="+380..."
        />

        <Input
          name={'photo'}
          label={'Нове посилання на аватарку'}
          value={newPhotoURL}
          onChange={onNewPhotoURLChange}
          error={errors.URL}
          placeholder="https://..."
        />

        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? 'Збереження...' : 'Обновити'}
        </Button>
      </form>
    </Modal>
  )
}

export default EditUserInfo
