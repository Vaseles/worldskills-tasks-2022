import React from 'react'
import {Routes, Route} from 'react-router-dom'
import Header from './components/Header/Header'
import Home from './pages/Home/Home'
import SignIn from './pages/Auth/SignIn'
import SignUp from './pages/Auth/SignUp'
import SignOut from './pages/Auth/SignOut'
import useAuth from './hooks/useAuth'
import User from './pages/User/User'
import Show from './pages/Show/Show'
import Game from './pages/Game/Game'

const Router = () => {
    const {isAuth} =useAuth()

  return (
    <div className="">
        <Header />
        <Routes>

            <Route path='/' element={<Home/>}  />

            <Route path='/sign-in' element={<SignIn/>}  />
            <Route path='/sign-up' element={<SignUp/>}  />

             <Route path='/sign-out' element={<SignOut/>}  />

             <Route path='/users/:name' element={<User/>}  />

             <Route path='/games/:slug' element={<Show/>}  />
             <Route path='/games/:slug/more' element={<Game/>}  />

        </Routes>
    </div>
  )
}

export default Router
