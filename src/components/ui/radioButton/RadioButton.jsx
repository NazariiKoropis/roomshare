//styles
import styles from './RadioButton.module.scss'

//lib
import clsx from 'clsx'

function RadioButtons({
  className,
  name,
  legend,
  options,
  selectedValue,
  onChange,
  errors,
  ...props
}) {
  const styledBlock = clsx(
    styles.radioGroup,
    errors && styles['radioGroup--error'],
    className,
  )

  return (
    <fieldset className={styles.wrapper}>
      <legend className="visually-hidden">{legend}</legend>
      <div className={styledBlock}>
        {options.map((option) => {
          const uniqueId = `${name}-${option.value}`

          return (
            <div key={option.value} className={styles.radioWrapper}>
              <input
                type="radio"
                id={uniqueId}
                name={name}
                value={option.value}
                checked={selectedValue === option.value}
                onChange={onChange}
                className={styles.radioInput}
                {...props}
              />
              <label htmlFor={uniqueId} className={styles.radioLabel}>
                {option.label}
              </label>
            </div>
          )
        })}
      </div>

      {errors && <span className={styles.errorText}>{errors}</span>}
    </fieldset>
  )
}

export default RadioButtons
