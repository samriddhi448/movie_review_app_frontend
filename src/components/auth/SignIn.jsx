import React, { useEffect, useState } from 'react'
import Container from '../Container'
import FormInput from '../form/FormInput'
import Submit from '../form/Submit'
import Title from '../form/Title'
import CustomLink from '../CustomLink'
import { commonModelClasses } from '../../utils/Theme'
import FormContainer from '../form/FormContainer'
import { useAuth, useNotification } from '../../hooks'
import { useNavigate } from 'react-router-dom'
import { isValidEmail } from '../../utils/helper'

const validateUserInfo = ({ name, email, password }) => {

  if (!email.trim()) return { ok: false, error: "Email is missing!" };
  if (!isValidEmail(email)) return { ok: false, error: "Invalid email!" };

  if (!password.trim()) return { ok: false, error: "Password is missing!" };
  if (password.length < 8)
    return { ok: false, error: "Password must be 8 characters long!" };

  return { ok: true };
};

export default function SignIn() {
  const [userInfo, setUserInfo] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate()
  const { updateNotification } = useNotification();

  const { handleLogin, authInfo }= useAuth();
  const {isPending, isLoggedIn} = authInfo;

  const handleChange = ({ target }) => {
    const { name, value } = target;
    setUserInfo({ ...userInfo, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { ok, error } = validateUserInfo(userInfo);

    if (!ok) return updateNotification("error", error);
    console.log(userInfo.email, userInfo.password)
    handleLogin(userInfo.email, userInfo.password)
  };

  useEffect(() => {
    if(isLoggedIn) {
      navigate('/')
    }
  },[isLoggedIn])

  return (
    <FormContainer>
      <Container>
        <form onSubmit={handleSubmit} className={commonModelClasses + ' w-72'}>
          <Title>Sign In</Title>
          <FormInput value = {userInfo.email} label='Email' placeholder='john@email.com' name='email' onChange={handleChange}/>
          <FormInput value = {userInfo.password}  label='Password' placeholder='********' name='password' type='password' onChange={handleChange}/>
          <Submit value='Sign In' busy={isPending}/>
          <div className='flex justify-between'>
            <CustomLink to="/auth/forget-password">Forget Password</CustomLink>
            <CustomLink to="/auth/signUp">Sign Up</CustomLink>
          </div>
        </form>
      </Container>
    </FormContainer>
  )
}
