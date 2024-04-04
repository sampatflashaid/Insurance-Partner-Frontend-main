import { useState } from 'react';
import {
  Heading,
  StyledButton,
  StyledDiv,
  StyledForm,
  StyledInput,
  StyledLink,
} from '../../UI/StyledTags';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import Spinner from '../../UI/Spinner';
import useLogin from '../ReactQuery/useLogin';
import { encryptData } from '../Utils/Encrypt';
import { insurancePartnerLogin,trackInsurancePartnerWebEngageEvent } from '../Utils/WebEngageUtils';

function Login({ setUser }) {
  const [contact, setContact] = useState('');
  const [msg, setMsg] = useState('');
  const navigate = useNavigate();
  const { login, isLoading } = useLogin();

  const disabled = !/^[6-9]\d{9}$/.test(contact);

  const handleSubmit = (e) => {
    e.preventDefault();
    trackInsurancePartnerWebEngageEvent("insur_part_login_contact",contact)
    login(
      { contact, setMsg },
      {
        onSuccess: (user) => {
          encryptData('user', user);
          setUser(user);
          toast.success('Login successful!', { duration: 1000 });
          insurancePartnerLogin(contact)
          navigate('/plans');
          trackInsurancePartnerWebEngageEvent("PARTNER LOGGEDIN")
        },
        onError: (err) => {
          if (err !== 'approved') {
            navigate('/signUp', { state: contact });
          }
        },
      }
    );
  };

  const handleMobileNumberChange = (e) => {
    const value = e.target.value;

    if (value && value.length === 10 && !/^[6-9]\d{9}$/.test(value)) {
      toast.error('Enter a valid mobile number!!', { duration: 1500 });
    }
    if (value.length < 11) {
      // setInsurancePartnerWebEngageAttribute("insur_part_login_contact",value)
      setContact(value);
      
    }
  };
  if (isLoading) return <Spinner msg='Login-In Please wait...' />;

  return (
    <>
      {!msg && (
        <StyledDiv>
          <Heading>Amazing ! Enter your mobile number to Log in</Heading>
          <StyledForm>
            <StyledInput
              placeholder='Enter Mobile number'
              value={contact}
              onChange={handleMobileNumberChange}
              max={10}
            />
            <StyledButton
              disabled={disabled}
              $bgcolor={disabled ? 'silver' : 'yellow'}
              onClick={handleSubmit}
              size='med'
            >
              Log-In
            </StyledButton>
          </StyledForm>
          <div>
            <p>Do not have account? Click on SignUp</p>
            <StyledLink to='/signUp'>SignUp</StyledLink>
          </div>
        </StyledDiv>
      )}
      {msg && <Spinner msg={msg} />}
    </>
  );
}

export default Login;
