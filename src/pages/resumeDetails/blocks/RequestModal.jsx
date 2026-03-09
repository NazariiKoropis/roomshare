//components
import Modal from './../../../components/ui/modal/Modal'
import Button from './../../../components/ui/button/Button'
import TextArea from './../../../components/ui/textArea/TextArea'

//react
import { useState } from 'react'

//services
import { createRequest } from '../../../services/request.service'

function RequestModal({
  isOpen,
  setIsOpen,
  targetID,
  targetType,
  ownerID,
  currentUserID,
}) {
  const [message, setMessage] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  const onMessageChange = (e) => setMessage(e.target.value)

  const handleClose = () => {
    setMessage('')
    setIsSubmitting(false)
    setIsOpen(false)
  }

  const handleSubmit = async () => {
    setIsSubmitting(true)

    const requestData = {
      createdAt: Date.now(),
      message: message,
      status: 'pending',
      targetID: targetID,
      targetType: targetType,
      userId_received: ownerID,
      userId_sent: currentUserID,
    }

    try {
      await createRequest(requestData)
      console.log('Заявка успішно відправлена:', requestData)
    } catch (error) {
      console.error('Помилка при відправці заявки:', error)
    } finally {
      setIsSubmitting(false)
      handleClose()
    }
  }

  const isFormValid = message.trim().length >= 5

  return (
    <Modal
      isOpen={isOpen}
      onClose={handleClose}
      title="Відгукнутися на оголошення"
    >
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        <p style={{ color: 'var(--text-secondary)' }}>
          Напишіть коротке повідомлення власнику. Розкажіть трохи про себе або
          задайте запитання.
        </p>

        <TextArea
          name={'requestMessage'}
          label={'Ваше повідомлення'}
          value={message}
          onChange={onMessageChange}
          placeholder="Наприклад: Привіт! Мене зацікавила Ваша анкета. Чи можемо ми зідзвонитися?"
        />

        <Button
          fullWidth
          onClick={handleSubmit}
          disabled={!isFormValid || isSubmitting}
        >
          {isSubmitting ? 'Відправка...' : 'Надіслати заявку'}
        </Button>
      </div>
    </Modal>
  )
}

export default RequestModal
