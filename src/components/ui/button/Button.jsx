//styles
import styles from './Button.module.scss'

//libs
import clsx from 'clsx'

function Button({
  type = 'button',
  variant = 'primary',
  className,
  fullWidth = false,
  children,
  ...props
}) {
  const buttonStyle = clsx(
    styles.button,
    styles[`button--${variant}`],
    { [styles['button-fullwidth']]: fullWidth },
    className,
  )

  return (
    <button type={type} className={buttonStyle} {...props}>
      {children}
    </button>
  )
}

export default Button
