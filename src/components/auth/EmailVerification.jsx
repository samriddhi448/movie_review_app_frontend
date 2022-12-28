import React, { useEffect, useState, useRef } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { verifytUser, verifyUser } from '../../api/auth'
import { useAuth, useNotification } from '../../hooks'
import { commonModelClasses } from '../../utils/Theme'
import Container from '../Container'
import FormContainer from '../form/FormContainer'
import Submit from '../form/Submit'
import Title from '../form/Title'

const OTP_LENGTH = 6;

const isValidOtp = (otp) => {
  let valid = false;
  for(let val of otp){
    valid = !isNaN(parseInt(val))
    if(!valid) break;
  }

  return valid;
}

export default function EmailVerification() {
  const [otp, setOtp] = useState(new Array(OTP_LENGTH).fill(''));
  const [activeOtpIndex, setActiveOtpIndex] = useState(0)
  const {isAuth, authInfo} = useAuth();
  const {isLoggedIn} = authInfo;
  const inputRef = useRef();
  const { state } = useLocation();
  const user = state?.user;
  const navigate = useNavigate();
  const {updateNotification} = useNotification();


  useEffect(() => {
    inputRef.current ?.focus()
  },[activeOtpIndex])

  useEffect(() => {
    if(!user) navigate('/not-found');
    if(isLoggedIn) navigate('/');
  },[user, isLoggedIn])


  const focusNextInputField = (index) => {
    setActiveOtpIndex(index + 1);
  }
  const focusPrevInputField = (index) => {
    let nextIndex;
    const diff = index - 1;
    nextIndex = diff !== 0 ? diff : 0;
    setActiveOtpIndex(nextIndex);

  }


  const handelOTPchange = ({target}, index) => {
    const { value } = target;
    const newOtp = [...otp];
    newOtp[index] = value.substring(value.length - 1, value.length);
    if(!value) focusPrevInputField(index);
    else focusNextInputField(index);
    setOtp([...newOtp])
  }

  const handleKeyDown = ({key}, index) => {
    if(key === 'Backspace') {
    focusPrevInputField(index);
    }
  }

  const handleSubmit = async(e) => {
    e.preventDefault();
    if(!isValidOtp(otp)) return updateNotification('error','invlaid OTP')
    const {error, message, user: userResponse} = await verifyUser({OTP: otp.join(""), userId: user.id})
    if(error) return updateNotification('error',error)
    updateNotification("success", message);
    localStorage.setItem ('auth-token',userResponse.token)
    isAuth();
    

  }


  return (
    <FormContainer>
      <Container>
        <form onSubmit={handleSubmit} className={commonModelClasses}>
          <div>
          <Title>Please enter the OTP to verify your account</Title>
          <p className='text-center dark:text-dark-subtle text-light-subtle'>OTP has been sent to your email</p>
          </div>
          <div className='flex justify-center items-center space-x-4'>
          {otp.map((_, index) => {
            return <input 
            ref={activeOtpIndex === index ? inputRef : null}
            key={index}
            value={otp[index] || " "}
            onChange={(e) => handelOTPchange(e, index)}
            onKeyDown={(e) => handleKeyDown(e, index)}
            type = 'number' className='w-12 h-12 border-2 dark:border-dark-subtle border-light-subtle dark:focus:border-white focus:border-secondary rounded bg-transparent outline-none text-center dark:text-white text-secondary font-semibold text-xl spin-button-none'/>
          })}
          </div>
          <Submit value='Verify Account'/>
        </form>
      </Container>
    </FormContainer>
  )
}
