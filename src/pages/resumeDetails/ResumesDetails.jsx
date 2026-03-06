//styles

//react
import { useParams } from 'react-router-dom'

function ResumeDetails() {
  const { resumeId } = useParams()
  return <section>{resumeId}</section>
}

export default ResumeDetails
