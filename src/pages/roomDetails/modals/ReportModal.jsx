//components
import Modal from '../../../components/ui/modal/Modal'
import Button from '../../../components/ui/button/Button'
import TextArea from './../../../components/ui/textArea/TextArea'
import ComboBox from './../../../components/ui/comboBox/ComboBox'

//react
import { useState } from 'react'

//services (не забудь імпортувати свій сервіс!)
import { createReport } from '../../../services/report.service'

const REPORT_TITLES = [
  'Скам / Шахрайство',
  'Неприйнятний контент',
  'Неактуальне оголошення',
  'Інше',
]

function ReportModal({ isOpen, setIsOpen, roomID, userID }) {
  const [reportTitle, setReportTitle] = useState('')
  const [reportText, setReportText] = useState('')

  const [isSubmitting, setIsSubmitting] = useState(false)

  const onReportTextChange = (e) => setReportText(e.target.value)
  const onReportTitleChange = (e) => setReportTitle(e.target.value)

  const handleClose = () => {
    setReportTitle('')
    setReportText('')
    setIsOpen(false)
  }

  const handleSubmit = async () => {
    setIsSubmitting(true)

    const reportData = {
      title: reportTitle,
      desc: reportText,
      targetType: 'room',
      targetID: roomID,
      reporterID: userID,
      createdAt: Date.now(),
      status: 'open',
    }

    await createReport(reportData)

    console.log('Скарга успішно відправлена:', reportData)

    setIsSubmitting(false)
    handleClose()
  }

  const isFormValid = reportTitle !== '' && reportText.trim().length >= 10

  return (
    <Modal isOpen={isOpen} onClose={handleClose} title="Надіслати скаргу">
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        <p style={{ color: 'var(--text-secondary)' }}>
          Що не так з цим оголошенням? Будь ласка, опишіть проблему детально.
        </p>

        <ComboBox
          name={'reportTitle'}
          label={'Категорія скарги'}
          values={REPORT_TITLES}
          value={reportTitle}
          onChange={onReportTitleChange}
          baseValue="Оберіть категорію..."
        />

        <TextArea
          name={'reportText'}
          label={'Ваша скарга (мінімум 10 символів)'}
          value={reportText}
          onChange={onReportTextChange}
          placeholder="Наприклад: Власник вимагає передоплату..."
        />

        <Button
          variant="error"
          fullWidth
          onClick={handleSubmit}
          disabled={!isFormValid || isSubmitting}
        >
          {isSubmitting ? 'Відправка...' : 'Відправити скаргу'}
        </Button>
      </div>
    </Modal>
  )
}

export default ReportModal
