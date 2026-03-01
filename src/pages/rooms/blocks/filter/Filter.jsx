//styles
import styles from './Filter.module.scss'

//components
import Button from './../../../../components/ui/button/Button'
import Input from './../../../../components/ui/input/Input'

//react
import { useState, useEffect } from 'react'

//services
import {
  getAllCities,
  getAllAmenities,
} from './../../../../services/room.service'

function Filter({ onFilterChange }) {
  const [cities, setCities] = useState([])
  const [amenities, setAmenities] = useState([])
  const [name, setName] = useState('')
  const [selectedCity, setSelectedCity] = useState('')
  const [selectedAmenities, setSelectedAmenities] = useState([])

  useEffect(() => {
    const fetchData = async () => {
      const fetchedCity = await getAllCities()
      const fetchedAmenities = await getAllAmenities()
      setCities(fetchedCity)
      setAmenities(fetchedAmenities)
    }
    fetchData()
  }, [])

  useEffect(() => {
    onFilterChange({
      name: name,
      city: selectedCity,
      amenities: selectedAmenities,
    })
  }, [name, selectedCity, selectedAmenities])

  const handleFilterName = (e) => {
    setName(e.target.value)
  }

  const handleCityChange = (e) => {
    setSelectedCity(e.target.value)
  }

  const handleAmenityChange = (amenity) => {
    setSelectedAmenities((prev) =>
      prev.includes(amenity)
        ? prev.filter((item) => item !== amenity)
        : [...prev, amenity],
    )
  }

  const handleResetFilters = () => {
    setName('')
    setSelectedCity('')
    setSelectedAmenities([])
  }

  return (
    <div className={styles.filterWrapper}>
      <h3 className={styles.filterTitle}>Фільтри</h3>

      <Input
        label="Назва"
        name="name"
        type="text"
        value={name}
        onChange={handleFilterName}
        placeholder="Наприклад: Світла кімната"
      />

      <div className={styles.filterGroup}>
        <label htmlFor="city-select" className={styles.label}>
          Місто
        </label>
        <select
          id="city-select"
          className={styles.select}
          value={selectedCity}
          onChange={handleCityChange}
        >
          <option value="">Усі міста</option>
          {cities.map((city) => (
            <option key={city} value={city}>
              {city}
            </option>
          ))}
        </select>
      </div>

      <div className={styles.filterGroup}>
        <label className={styles.label}>Зручності</label>
        <div className={styles.checkboxList}>
          {amenities.map((amenity) => (
            <label key={amenity} className={styles.checkboxLabel}>
              <input
                type="checkbox"
                checked={selectedAmenities.includes(amenity)}
                onChange={() => handleAmenityChange(amenity)}
                className={styles.checkboxInput}
              />
              <span className={styles.checkboxText}>{amenity}</span>
            </label>
          ))}
        </div>
      </div>

      <Button onClick={handleResetFilters} fullWidth>
        Скинути
      </Button>
    </div>
  )
}

export default Filter
