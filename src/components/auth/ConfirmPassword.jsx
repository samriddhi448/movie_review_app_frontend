import React from 'react'
import { commonModelClasses } from '../../utils/Theme'
import Container from '../Container'
import FormContainer from '../form/FormContainer'
import FormInput from '../form/FormInput'
import Submit from '../form/Submit'
import Title from '../form/Title'

export default function ConfirmPassword() {
  //http://localhost:3000/reset-password?token=5fff37c244be3904a5d4143609639abc0df6d7b72b2846bbd135e83ae6a7&id=63884b3a6230b8de968f52d4
  return (
    <FormContainer>
      <Container>
        <form className={commonModelClasses + ' w-96'}>
          <Title>Enter New Password</Title>
          <FormInput label='New Password' placeholder='********' name='password' type='password'/>
          <FormInput label='Confirm Password' placeholder='********' name='confirmPassword' type='password'/>
          <Submit value='Confirm Password'/>
        </form>
      </Container>
    </FormContainer>
  )
}
