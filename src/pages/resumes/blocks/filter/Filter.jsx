//styles
import styles from './Filter.module.scss'

//components
import Button from './../../../../components/ui/button/Button'
import Input from './../../../../components/ui/input/Input'
import RadioButton from './../../../../components/ui/radioButton/RadioButton'
import ComboBox from '../../../../components/ui/comboBox/ComboBox'

function Filter() {
  return <ComboBox label={'1'} name={'1'} values={[123, 3213]} baseValue={12} />
}

export default Filter
