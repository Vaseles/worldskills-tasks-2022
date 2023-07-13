import React, {createContext, useState} from 'react'

export const AuthContext = createContext() 

const AuthProvider = ({children}) => {
  const [isAuth, setIsAuth] = useState(!!localStorage.getItem('token'))
  const [name, setName] = useState(localStorage.getItem('name')? localStorage.getItem('name') : '')

  return (
    <AuthContext.Provider value={{ isAuth , setIsAuth, setName, name  }}>
      {children}
    </AuthContext.Provider>
  )
}

export default AuthProvider
