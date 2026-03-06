//styles
import styles from './../../../rooms/blocks/filter/Filter.module.scss'

//components
import Button from './../../../../components/ui/button/Button'
import Input from './../../../../components/ui/input/Input'
import RadioButton from './../../../../components/ui/radioButton/RadioButton'
import ComboBox from '../../../../components/ui/comboBox/ComboBox'

//react
import { useState, useEffect } from 'react'

//services
import { getAllCities } from '../../../../services/people.service'

function Filter({ onFilterChange }) {
  // consts
  const [cities, setCities] = useState([])
  const genderOptions = [
    { label: 'Чоловік', value: 'male' },
    { label: 'Жінка', value: 'female' },
  ]

  // filters state
  const [name, setName] = useState('')
  const [budget, setBudget] = useState('')
  const [selectedCity, setSelectedCity] = useState('')
  const [gender, setGender] = useState('')

  useEffect(() => {
    const fetchData = async () => {
      const fetchedCity = await getAllCities()
      setCities(fetchedCity)
    }
    fetchData()
  }, [])

  useEffect(() => {
    onFilterChange({
      name,
      city: selectedCity,
      budget: budget ? Number(budget) : null,
      gender,
    })
  }, [name, budget, selectedCity, gender, onFilterChange])

  const handleName = (e) => setName(e.target.value)
  const handleBudget = (e) => setBudget(e.target.value)
  const handleSelectCity = (e) => setSelectedCity(e.target.value)
  const handleGender = (e) => setGender(e.target.value)

  const handleResetFilters = () => {
    setName('')
    setBudget('')
    setSelectedCity('')
    setGender('')
  }

  return (
    <div className={styles.filterWrapper}>
      <h2 className={styles.filterTitle}>Фільтри</h2>
      <Input
        name="name"
        label="Ім'я"
        value={name}
        onChange={handleName}
        placeholder="Богдан Богданович"
      />

      <Input
        type="number"
        name="budget"
        label="Вкажіть мінімальний бюджет"
        value={budget}
        onChange={handleBudget}
        placeholder="Наприклад: 5000"
      />

      <ComboBox
        name="city"
        label="Оберіть місто"
        values={cities}
        value={selectedCity}
        onChange={handleSelectCity}
      />

      <RadioButton
        name="gender"
        legend="Вибір статі"
        options={genderOptions}
        selectedValue={gender}
        onChange={handleGender}
      />

      <Button onClick={handleResetFilters} fullWidth>
        Скинути
      </Button>
    </div>
  )
}

export default Filter
