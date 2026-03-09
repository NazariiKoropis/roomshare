//styles
import styles from './TextArea.module.scss'

//libs
import clsx from 'clsx'

function TextArea({
  className,
  name,
  label,
  value,
  onChange,
  error,
  ...props
}) {
  return (
    <div className={styles.textAreaWrapper}>
      {label && (
        <label className={styles.label} htmlFor={name}>
          {label}
        </label>
      )}
      <textarea
        className={clsx(
          styles.textarea,
          error && styles['textarea--error'],
          className,
        )}
        name={name}
        id={name}
        value={value}
        onChange={onChange}
        {...props}
      />

      {error && <span className={styles.errorText}>{error}</span>}
    </div>
  )
}

export default TextArea
