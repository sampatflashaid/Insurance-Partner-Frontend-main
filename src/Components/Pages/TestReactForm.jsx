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
import useSignUp from '../ReactQuery/useSignUp';
import { useLocation, useNavigate } from 'react-router-dom';
import Spinner from '../../UI/Spinner';

function SignUp({ setUser }) {
  const { state } = useLocation();
  const [contact, setContact] = useState(state || '');
  const [email, setEmail] = useState('');
  const [firstname, setFirstName] = useState('');
  const [lastname, setLastName] = useState('');

  const navigate = useNavigate();
  const { manualRefetch, isFetching } = useSignUp(
    { contact, firstname, lastname, email },
    setUser,
    navigate
  );

  const disabled = !/^[6-9]\d{9}$/.test(contact) || !firstname || !lastname;

  const handleMobileNumberChange = (e) => {
    const value = e.target.value;

    if (value && value.length === 10 && !/^[6-9]\d{9}$/.test(value)) {
      toast.error('Enter a valid mobile number!!', { duration: 1500 });
    }
    if (value.length < 11) {
      setContact(value);
    }
  };
  const handleEmailChange = (e) => {
    const value = e.target.value;
    setEmail(value);
  };

  const handleFirstNameChange = (e) => {
    const value = e.target.value;
    if (value && !/^[a-zA-Z]+$/.test(value)) {
      toast.error('Enter only alphabets without any space!!', {
        duration: 1500,
      });
      return;
    }
    setFirstName(value);
  };

  const handleLastNameChange = (e) => {
    const value = e.target.value;
    if (value && !/^[a-zA-Z]+$/.test(value)) {
      toast.error('Enter only alphabets without any space!!', {
        duration: 1500,
      });
      return;
    }
    setLastName(value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email)) {
      toast.error('Enter a valid Email Id!!', { duration: 1500 });
      return;
    }

    manualRefetch();
  };
  if (isFetching) return <Spinner msg='Signing up! Please wait...' />;
  return (
    <StyledDiv>
      <Heading>
        Great! Applying for Flashaid Membership takes only 2 minutes.
      </Heading>
      <StyledForm>
        <StyledInput
          placeholder='Enter Mobile number'
          value={contact}
          onChange={handleMobileNumberChange}
        />
        <StyledInput
          type='email'
          placeholder='Enter Email Id'
          value={email}
          onChange={handleEmailChange}
        />
        <StyledInput
          placeholder='Enter First Name'
          value={firstname}
          onChange={handleFirstNameChange}
        />
        <StyledInput
          placeholder='Enter Last Name'
          value={lastname}
          onChange={handleLastNameChange}
        />
        <StyledButton
          disabled={disabled}
          $bgcolor={disabled ? 'silver' : 'yellow'}
          onClick={handleSubmit}
          size='med'
        >
          Sign-Up
        </StyledButton>
      </StyledForm>
      <div>
        <p>Already have account? Click on Login</p>
        <StyledLink to='/'>Login</StyledLink>
      </div>
    </StyledDiv>
  );
}

export default SignUp;
