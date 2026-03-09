//components
import Modal from '../../../components/ui/modal/Modal'
import Button from '../../../components/ui/button/Button'
import TextArea from './../../../components/ui/textArea/TextArea'
import ComboBox from './../../../components/ui/comboBox/ComboBox'

//react
import { useState } from 'react'

import { createReport } from '../../../services/report.service'

const REPORT_TITLES = [
  'Скам / Шахрайство',
  'Неприйнятна поведінка / контент',
  'Неактуальна анкета',
  'Спам',
  'Інше',
]

function ReportResumeModal({ isOpen, setIsOpen, resumeId, currentUserId }) {
  const [reportTitle, setReportTitle] = useState('')
  const [reportText, setReportText] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  const onReportTextChange = (e) => setReportText(e.target.value)
  const onReportTitleChange = (e) => setReportTitle(e.target.value)

  const handleClose = () => {
    setReportTitle('')
    setReportText('')
    setIsSubmitting(false)
    setIsOpen(false)
  }

  const handleSubmit = async () => {
    setIsSubmitting(true)

    const reportData = {
      title: reportTitle,
      desc: reportText,
      targetType: 'resume',
      targetID: resumeId,
      reporterID: currentUserId,
      createdAt: Date.now(),
      status: 'open',
    }

    try {
      await createReport(reportData)
      console.log('Скарга на анкету успішно створена:', reportData)
    } catch (error) {
      console.error('Помилка при відправці скарги:', error)
    } finally {
      setIsSubmitting(false)
      handleClose()
    }
  }

  const isFormValid = reportTitle !== '' && reportText.trim().length >= 10

  return (
    <Modal isOpen={isOpen} onClose={handleClose} title="Поскаржитися на анкету">
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        <p style={{ color: 'var(--text-secondary)' }}>
          Що не так з цим кандидатом? Будь ласка, опишіть проблему детально, щоб
          модератори могли швидко відреагувати.
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
          placeholder="Наприклад: Користувач спамить однаковими повідомленнями..."
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

export default ReportResumeModal
