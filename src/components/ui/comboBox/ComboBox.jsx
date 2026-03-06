//libs
import clsx from 'clsx'
import styles from './ComboBox.module.scss'

//icons
import { ChevronDown } from 'lucide-react'

function ComboBox({
  className,
  name,
  label,
  values = [],
  onChange,
  baseValue = 'Оберіть варіант',
  value,
  ...props
}) {
  const comboBoxStyles = clsx(styles.select, className)

  const handleChange = (e) => {
    if (onChange) onChange(e)

    e.target.blur()
  }

  return (
    <div className={styles.comboBoxWrapper}>
      {label && (
        <label className={styles.label} htmlFor={name}>
          {label}
        </label>
      )}

      <div className={styles.selectContainer}>
        <select
          name={name}
          id={name}
          value={value}
          onChange={handleChange}
          className={comboBoxStyles}
          {...props}
        >
          <option value="">{baseValue}</option>
          {values.map((item) => (
            <option key={item} value={item}>
              {item}
            </option>
          ))}
        </select>

        <ChevronDown className={styles.customArrow} size={20} />
      </div>
    </div>
  )
}

export default ComboBox
