//styles
import styles from './Input.module.scss'

//libs
import clsx from 'clsx'

function Input({
  className,
  type = 'text',
  name,
  label,
  value,
  onChange,
  error,
  ...props
}) {
  return (
    <div className={styles.inputWrapper}>
      {label && (
        <label className={styles.label} htmlFor={name}>
          {label}
        </label>
      )}
      <input
        id={name}
        name={name}
        type={type}
        className={clsx(
          styles.input,
          error && styles['input--error'],
          className,
        )}
        placeholder={label}
        value={value}
        onChange={onChange}
        {...props}
      />

      {error && <span className={styles.errorText}>{error}</span>}
    </div>
  )
}

export default Input
