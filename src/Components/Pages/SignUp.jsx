import { useForm } from 'react-hook-form';
import {
  Heading,
  StyledButton,
  StyledDiv,
  StyledForm,
  StyledInput,
  StyledLabel,
  StyledOption,
  StyledSelect,
} from '../../UI/StyledTags';
import { getAgeFromDate } from '../Utils/HelperFun';
import toast from 'react-hot-toast';
import Spinner from '../../UI/Spinner';
import { useSignUp } from '../ReactQuery/useSignUp';
import { encryptData } from '../Utils/Encrypt';
import { useLocation, useNavigate } from 'react-router-dom';
import { trackInsurancePartnerWebEngageEvent } from '../Utils/WebEngageUtils';
//setInsurancePartnerWebEngageAttribute, 
const nameRegex = /^[a-zA-Z]+$/;
const mobileRegex = /^[6-9]\d{9}$/;
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const keyObj = {
  firstname: 'First Name',
  lastname: 'Last Name',
  contact: 'Mobile Number',
  email: 'Email Id',
  gender: 'Gender',
  date_of_birth: 'Date Of Birth',
};

function SignUp({ setUser }) {
  const { state } = useLocation();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const navigate = useNavigate();

  const { signup, isLoading } = useSignUp();

  const validateName = (value) => {
    if (!value.length) {
      return 'This field is required';
    }
    return nameRegex.test(value) || 'Only alphabets allowed without space';
  };

  function validateMobile(value) {
    if (!value.length) {
      return 'This field is required';
    }
    return mobileRegex.test(value) || 'Enter a valid mobile number';
  }

  function validateEmail(value) {
    if (!value.length) {
      return 'This field is required';
    }
    return emailRegex.test(value) || 'Enter a valid Email Id';
  }

  const onSubmit = (data) => {
    
    const age = getAgeFromDate(data.date_of_birth);

    for (const key in data) {
      const value = data[key];
      if (!value) {
        toast.error(`Please provide ${keyObj[key]}`);
        return;
      }
    }

    if (age > 60 || age < 18) {
      toast.error('Age should be less than 60 and greater than 17 years!');
      return;
    }
    const obj = {
      primary_details: {
        ...data,
        fullname: data.firstname + ' ' + data.lastname,
        age,
      },
      companyName: sessionStorage.getItem('companyName') || 'Retail - Family',
      companyId: sessionStorage.getItem('id') || '1705134739179',
    };
    trackInsurancePartnerWebEngageEvent("PartnerSignupData",data)
    signup(obj, {
      onSuccess: (user) => {
        encryptData('user', user);
        setUser(user);
        toast.success('Signup successful!', { duration: 1000 });
        trackInsurancePartnerWebEngageEvent("PARTNER SIGNEDUP")
        navigate('/plans');
      },
    });
  };

  if (isLoading) return <Spinner msg='Creating account!! Please wait...' />;

  return (
    
    <StyledDiv onSubmit={handleSubmit(onSubmit)} gap='20px'>
      <Heading>
        Great! Applying for Flashaid Membership takes only 2 minutes.
      </Heading>
      <StyledForm>
        <StyledInput
          placeholder='Enter First Name'
          {...register('firstname', {
            validate: validateName,
          })}
        />
        {errors.firstname && (
          <p style={{ color: 'red' }}>⚠️ {errors.firstname.message}</p>
        )}
        <StyledInput
          placeholder='Enter Last Name'
          {...register('lastname', { validate: validateName })}
        />
        {errors.lastname && (
          <p style={{ color: 'red' }}>⚠️ {errors.lastname.message}</p>
        )}
        <StyledInput
          placeholder='Enter Mobile number'
          {...register('contact', { validate: validateMobile })}
          defaultValue={state}
        />
        {errors.contact && (
          <p style={{ color: 'red' }}>⚠️ {errors.contact.message}</p>
        )}
        <StyledInput
          placeholder='Enter Email id'
          {...register('email', { validate: validateEmail })}
        />
        {errors.email && (
          <p style={{ color: 'red' }}>⚠️ {errors.email.message}</p>
        )}

        <StyledSelect
          {...register('gender', { required: 'Please select gender' })}
        >
          <StyledOption value=''>Select gender</StyledOption>
          <StyledOption value='Male'>Male</StyledOption>
          <StyledOption value='Female'>Female</StyledOption>
          <StyledOption value='Other'>Other</StyledOption>
        </StyledSelect>
        {errors.gender && (
          <p style={{ color: 'red' }}>⚠️ {errors.gender.message}</p>
        )}
        <StyledLabel>
          Date of birth
          <StyledInput type='date' {...register('date_of_birth')} />
        </StyledLabel>
        <StyledButton size='med'>Sign-Up</StyledButton>
      </StyledForm>

      {/* <StyledInput placeholder='Enter Email id' {...register('email')} /> */}
    </StyledDiv>
  );
}

export default SignUp;
