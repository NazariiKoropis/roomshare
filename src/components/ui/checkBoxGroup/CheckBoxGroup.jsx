//styles
import styles from './CheckBoxGroup.module.scss'

function CheckBoxGroup({
  label,
  name,
  values = [],
  selectedValues = [],
  onChange,
}) {
  return (
    <div>
      {label && <p className={styles.label}>{label}</p>}

      <div className={styles.checkboxList}>
        {values.map((item) => (
          <label key={item} className={styles.checkboxLabel}>
            <input
              type="checkbox"
              name={name}
              value={item}
              checked={selectedValues.includes(item)}
              onChange={() => onChange(item)}
              className={styles.checkboxInput}
            />
            <span className={styles.checkboxText}>{item}</span>
          </label>
        ))}
      </div>
    </div>
  )
}

export default CheckBoxGroup
