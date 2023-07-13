import { useEffect, useState } from 'react'
import styles from './Auth.module.css'
import Button from '../../components/ui/Button/Button';
import { $axios } from '../../api';
import useAuth from '../../hooks/useAuth';
import { useNavigate } from 'react-router-dom';

const SignIn = () => {
    const {isAuth, setIsAuth, setName}  = useAuth()
    const navigate = useNavigate()
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    useEffect (() => {
        document.title = 'Sign In'

        if (isAuth) {
            navigate('/')
        }
    }, [])

    const signin = (e) => {
        e.preventDefault()
        $axios.post('/auth/signin', {
            username:username, 
            password: password
        })
            .then((response) => {
                localStorage.setItem('token', response.data.token)
                localStorage.setItem('name', username)
                setIsAuth(true)
                setName(username)

                window.location.reload()
                navigate('/')
            })
            .catch((error) => {
                console.error(error)
                setError(error.response.data.message)
            })
    }

  return (
        <div className={styles.auth}>
            <h2 className={styles.auth__title}>
                Sign In
            </h2>
        <form className={styles.auth__block}>
            <input  
                type="text" 
                value={username}
                onChange = {e=> setUsername(e.target.value)}
                placeholder=' username...'
                required
            />
            <input  
                type="password" 
                value={password}
                onChange = {e=> setPassword(e.target.value)}
                placeholder=' password...'
                required
            />
            {error? (<div className='error'>{error}</div>): null}
            <div className="buttons">
                <Button   onClick={signin}>Sign In</Button>
                <a href='/'>Cancel</a>
            </div>
        </form>
        </div>
  )
}

export default SignIn
