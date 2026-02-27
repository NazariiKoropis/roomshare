//styles
import styles from './RoomCard.module.scss'

//services
import { getRoomImage } from './../../../utils/imagesUtil'

//react
import { Building2, MapPinHouse } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

function RoomCard({ room }) {
  const {
    id,
    title,
    desc,
    price,
    slug,
    amenities,
    location: { city, address },
  } = room
  const navigate = useNavigate()

  const imageUrl = getRoomImage(slug) || getRoomImage('default.png')

  const handleNavigate = () => {
    navigate(`/rooms/${id}`)
  }

  return (
    <article
      className={styles.cardWrapper}
      style={{ backgroundImage: `url(${imageUrl})` }}
      onClick={handleNavigate}
    >
      <div className={styles.cardContent}>
        <h3 className={styles.cardTitle}>{title}</h3>

        <div className={styles.cardInfo}>
          <p className={styles.price}>
            {price} ₴ <span className={styles.period}>/ міс</span>
          </p>

          <p className={styles.desc}>{desc}</p>

          <div className={styles.locationGroup}>
            <span className={styles.location}>
              <Building2 size={16} /> {city}
            </span>
            <span className={styles.location}>
              <MapPinHouse size={16} /> {address}
            </span>
          </div>

          {amenities && amenities.length > 0 && (
            <ul className={styles.amenities}>
              {amenities.slice(0, 3).map((item) => (
                <li key={item} className={styles.amenityTag}>
                  {item}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </article>
  )
}

export default RoomCard
