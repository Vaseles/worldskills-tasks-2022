import React from 'react'
import styles from './Header.module.css'
import useAuth from '../../hooks/useAuth'
import { $axios } from '../../api'
import Button from '../ui/Button/Button'
import { useNavigate } from 'react-router-dom'

const Header = () => {
  // get some varibles from useAuth
  const {name, isAuth, setName, setIsAuth} = useAuth()
  const navigate = useNavigate()

  // logout function
  const logout = () => {
    $axios.post('/auth/signout')
      .then(() => {
        // clear data
        localStorage.clear();
        setName('')
        setIsAuth(false)
        
        // redirect to sign-out
        navigate('/sign-out')
      })
  }

  return (
    <header className={styles.header}>
        <a className={styles.header__title} href='/'>
            WorldSkills: Games
        </a>
        <div className={styles.header__menu}>
            {isAuth ? (
              <>
                <a href={`/users/${name}`}>{name}</a>
                <Button onClick={logout}> logout</Button>
              </>
            ): (
              <>
                <a href="/sign-up" className="">Sign Up</a>
                <a href="/sign-in">Sign In</a>
              </>
            )}
        </div>
    </header>
  )
}

export default Header
