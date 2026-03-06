//styles
import styles from './Filter.module.scss'

//components
import Button from './../../../../components/ui/button/Button'
import Input from './../../../../components/ui/input/Input'
import ComboBox from '../../../../components/ui/comboBox/ComboBox'
import CheckBoxGroup from './../../../../components/ui/checkBoxGroup/CheckBoxGroup'

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
  }, [name, selectedCity, selectedAmenities, onFilterChange])

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

      <ComboBox
        name={'city-select'}
        label={'Місто'}
        value={selectedCity}
        values={cities}
        onChange={handleCityChange}
        baseValue="Усі міста"
      />

      <CheckBoxGroup
        label="Зручності"
        name="amenities"
        values={amenities}
        selectedValues={selectedAmenities}
        onChange={handleAmenityChange}
      />

      <Button onClick={handleResetFilters} fullWidth>
        Скинути
      </Button>
    </div>
  )
}

export default Filter
