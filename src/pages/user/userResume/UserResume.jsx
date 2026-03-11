//styles
import styles from './UserResume.module.scss'

//components
import ResumeCreate from './ResumeCreate/ResumeCreate'
import ResumeEdit from './ResumeEdit/ResumeEdit'

//context
import { useAuth } from '../../../context/AuthContext'

//hooks
import { useFetch } from '../../../hooks/useFetch'

//services
import { getResumeByUserId } from '../../../services/people.service'

//react
import { useCallback } from 'react'

//libs
import { ThreeDots } from 'react-loader-spinner'

function UserResume() {
  const { currentUser } = useAuth()

  const fetchUserResume = useCallback(
    () => getResumeByUserId(currentUser.uid),
    [currentUser.uid],
  )

  const { data: resumeData, loading } = useFetch(fetchUserResume)

  if (loading) {
    return (
      <div className={styles.loaderWrapper}>
        <ThreeDots
          height="80"
          width="80"
          radius="9"
          color="var(--accent-primary)"
          visible={true}
        />
      </div>
    )
  }

  return (
    <div className={styles.wrapper}>
      {resumeData ? (
        <ResumeEdit resumeData={resumeData} />
      ) : (
        <ResumeCreate userId={currentUser.uid} />
      )}
    </div>
  )
}

export default UserResume
