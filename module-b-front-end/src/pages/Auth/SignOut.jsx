import { useEffect } from 'react'
import styles from './Auth.module.css'


const SignOut = () => {
    useEffect(() => {
        document.title = 'Sign Out'
    }, [])

  return (
<div className={styles.auth}>
        <h2 className={styles.auth__title}>
            Sign Out
        </h2>
      <div className={styles.auth__block}>
        <p>You have been successfully signed out.</p>
      </div>
    </div>
  )
}

export default SignOut
