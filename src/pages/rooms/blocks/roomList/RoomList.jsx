//styles
import styles from './RoomList.module.scss'

//components
import RoomCard from './../../../../components/shared/roomCard/RoomCard'

function RoomList({ rooms }) {
  if (!rooms || rooms.length === 0) {
    return (
      <div className={styles.emptyState}>
        <h3>На жаль, нічого не знайдено 😔</h3>
        <p>Спробуйте змінити параметри пошуку або завітайте пізніше.</p>
      </div>
    )
  }

  return (
    <section>
      <h2 className="visually-hidden">Список кімнат</h2>

      <ul className={styles.roomListWrapper}>
        {rooms.map((item) => (
          <li key={item.id}>
            <RoomCard room={item} />
          </li>
        ))}
      </ul>
    </section>
  )
}

export default RoomList
