import React, { useState } from 'react'
import { forgetPassword } from '../../api/auth'
import { useNotification } from '../../hooks'
import { isValidEmail } from '../../utils/helper'
import { commonModelClasses } from '../../utils/Theme'
import Container from '../Container'
import CustomLink from '../CustomLink'
import FormContainer from '../form/FormContainer'
import FormInput from '../form/FormInput'
import Submit from '../form/Submit'
import Title from '../form/Title'

export default function ForgetPassword() {
  const [email, setEmail] = useState('');
  const handleChange = ({ target }) => {
    const {  value } = target;
    setEmail(value);
  };
  const { updateNotification} = useNotification();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if(!isValidEmail(email)) return updateNotification('error', 'Invalid email');
    const {error, message} = await forgetPassword(email);
    if(error) return updateNotification('error', error);
    console.log('message',message)
    updateNotification("success", message);
    

  };
  return (
    <FormContainer>
      <Container>
        <form onSubmit={handleSubmit} className={commonModelClasses +' w-96'}>
          <Title>Please enter your Email</Title>
          <FormInput label='Email' onChange={handleChange} value={email} placeholder='john@email.com' name='email'/>
          <Submit value='Send Link'/>
          <div className='flex justify-between'>
            <CustomLink to="/auth/signIn">Sign In</CustomLink>
            <CustomLink to="/auth/signUp">Sign Up</CustomLink>
          </div>
        </form>
      </Container>
    </FormContainer>
  )
}
