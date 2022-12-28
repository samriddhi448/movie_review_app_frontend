import React from 'react'
import {Route ,Routes} from 'react-router-dom'
import Home from './components/Home.jsx'
import SignIn from './components/auth/SignIn.jsx'
import SignUp from './components/auth/SignUp.jsx'
import Navbar from './components/user/Navbar.jsx'
import EmailVerification from './components/auth/EmailVerification.jsx'
import ForgetPassword from './components/auth/ForgetPassword.jsx'
import ConfirmPassword from './components/auth/ConfirmPassword.jsx'
import NotFound from './components/NotFound.jsx'

export default function App() {
  return (
    <>
      <Navbar/>
        <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/auth/signIn' element={<SignIn />} />
        <Route path='/auth/signUp' element={<SignUp />} />
        <Route path='/auth/verification' element={<EmailVerification />} />
        <Route path='/auth/forget-password' element={<ForgetPassword />} />
        <Route path='/auth/reset-password' element={<ConfirmPassword />} />
        <Route path='*' element={<NotFound />} />
      </Routes>
    </>
  )
}
