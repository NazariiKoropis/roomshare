//styles
import styles from './Container.module.scss'

//libs
import clsx from 'clsx'

function Container({ styled, children }) {
  return <div className={clsx(styles.Container, styled)}>{children}</div>
}

export default Container
