//components
import Modal from '../../../../components/ui/modal/Modal'
import Button from '../../../../components/ui/button/Button'

function ContactsModal({ isOpen, setIsOpen, ownerName, contacts }) {
  return (
    <Modal
      isOpen={isOpen}
      onClose={() => setIsOpen(false)}
      title="Контакти власника"
    >
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        <p style={{ fontSize: '1.1rem' }}>
          <strong>Ім'я:</strong> {ownerName}
        </p>

        <p>
          <strong> Мобільний: </strong>
          {contacts?.phone ? (
            <a
              href={`tel:${contacts.phone}`}
              style={{ color: 'var(--accent-primary)', textDecoration: 'none' }}
            >
              {contacts.phone}
            </a>
          ) : (
            <span
              style={{
                fontSize: '1rem',
                color: 'var(--text-secondary)',
                fontWeight: 'normal',
              }}
            >
              Телефон не вказано
            </span>
          )}
        </p>

        {contacts?.whatsapp && (
          <p>
            <strong>WhatsApp:</strong>{' '}
            <a
              href={`https://wa.me/${contacts.whatsapp.replace(/[^0-9]/g, '')}`}
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: 'var(--accent-primary)', textDecoration: 'none' }}
            >
              {contacts.whatsapp}
            </a>
          </p>
        )}

        <Button fullWidth onClick={() => setIsOpen(false)}>
          Закрити
        </Button>
      </div>
    </Modal>
  )
}

export default ContactsModal
