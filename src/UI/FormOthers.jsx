import { useRef, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import {
  StyledButton,
  StyledDiv,
  StyledFlex,
  StyledForm,
  StyledInput,
  StyledLabel,
  StyledOption,
  StyledSelect,
} from './StyledTags';
import toast from 'react-hot-toast';
import Modal from './Modal';
import DisplayObject from './DisplayObject';
import Spinner from './Spinner';
import { useUpdateUser } from '../Components/ReactQuery/useUpdateUser';
import { getAgeFromDate } from '../Components/Utils/HelperFun';
import { send_docs } from '../Components/Api-call';
import { decryptData } from './../Components/Utils/Decrypt';

// let spouse = 0;

function FormOthers() {
  const location = useLocation();
  const navigate = useNavigate();
  const dateRef = useRef();

  const [count, setCount] = useState(1);
  const [pageDetails, setPageDetails] = useState({});

  const [otherMembers, setOtherMembers] = useState({});
  const [showModal, setShowModal] = useState(false);

  const total = location.state.total - 1;
  const { id, boughtPlan } = location.state;
  const { updateUserPatch, isUpdating } = useUpdateUser();

  const user = decryptData('user');
  if (Object.keys(user.otherMembers).length) {
    return (
      <StyledDiv>
        <h1>You already submitted details of other members</h1>
      </StyledDiv>
    );
  }

  function onChangeHandler(e) {
    const { name, value } = e.target;
    if (value === 'spouse' && otherMembers[value]) {
      toast.error(`You already added ${value}`);
      return;
    }

    setPageDetails((old) => {
      return {
        ...old,
        [count]: {
          ...old[count],
          [name]: value,
        },
      };
    });
  }

  function nextHandler(e) {
    e.preventDefault();
    dateRef.current.focus();
    const { relationship, fullname, date_of_birth, gender } =
      pageDetails[count];

    if (!fullname) {
      toast.error('Please enter fullname', { duration: 1500 });
      return;
    }
    if (!date_of_birth) {
      toast.error('Please enter date of birth', { duration: 1500 });
      return;
    }
    if (!gender) {
      toast.error('Please enter gender', { duration: 1500 });
      return;
    }
    if (!relationship) {
      toast.error('Please add Relationship', { duration: 1500 });
      return;
    }

    const age = getAgeFromDate(date_of_birth);
    if (relationship === 'spouse' && age < 18) {
      toast.error('Spouse must be at least 18 years old.', { duration: 1500 });
      return;
    }

    const key =
      relationship === 'spouse'
        ? 'spouse'
        : otherMembers['child_1']
        ? 'child_2'
        : 'child_1';

    setOtherMembers((old) => {
      return {
        ...old,
        [key]: {
          fullname,
          date_of_birth,
          gender,
          age,
          relationship,
        },
      };
    });

    count < total && setCount((old) => old + 1);
  }

  function submitHandler(e) {
    e.preventDefault();

    const obj = {
      id,
      otherMembers,
    };
    updateUserPatch(obj, {
      onSuccess: () => {
        send_docs({ boughtPlan });
        setShowModal(false);
        navigate('/confirm');
      },
    });
  }

  if (isUpdating)
    return <Spinner msg='Updating other members details!! Please wait...' />;

  return (
    <>
      <StyledDiv>
        <h2>Please fill Other members details!!</h2>
        <StyledForm>
          <p>{`MEMBER-${count} DETAILS`}</p>
          <StyledLabel>
            Date of birth
            <StyledInput
              ref={dateRef}
              type='date'
              name='date_of_birth'
              value={pageDetails[count]?.date_of_birth || ''}
              autoFocus
              onChange={onChangeHandler}
              required
            />
          </StyledLabel>
          <StyledInput
            type='text'
            placeholder='Full Name'
            name='fullname'
            value={pageDetails[count]?.fullname || ''}
            onChange={onChangeHandler}
            required
          />
          <StyledSelect
            name='gender'
            value={pageDetails[count]?.gender || ''}
            onChange={onChangeHandler}
            required
          >
            <StyledOption value=''>Select Gender</StyledOption>
            <StyledOption value='Male'>Male</StyledOption>
            <StyledOption value='Female'>Female</StyledOption>
            <StyledOption value='Other'>Other</StyledOption>
          </StyledSelect>
          <StyledSelect
            name='relationship'
            value={pageDetails[count]?.relationship || ''}
            onChange={onChangeHandler}
            required
          >
            <StyledOption value=''>Relationship</StyledOption>
            <StyledOption value='spouse'>Spouse</StyledOption>
            <StyledOption value='daughter'>Daughter</StyledOption>
            <StyledOption value='son'>Son</StyledOption>
          </StyledSelect>

          <StyledFlex style={{ width: '100%' }}>
            {count > 1 && (
              <StyledButton
                size='med'
                onClick={(e) => {
                  e.preventDefault();
                  setCount((old) => old - 1);
                }}
              >
                PREVIOUS
              </StyledButton>
            )}
            {count < total ? (
              <StyledButton
                size='med'
                onClick={nextHandler}
                // bgcolor={disabled ? 'silver' : 'yellow'}
              >
                NEXT
              </StyledButton>
            ) : (
              <StyledButton
                size='med'
                onClick={(e) => {
                  e.preventDefault();
                  nextHandler(e);
                  setShowModal(true);
                }}
                // bgcolor={disabled ? 'silver' : 'yellow'}
              >
                SHOW
              </StyledButton>
            )}
          </StyledFlex>
        </StyledForm>
      </StyledDiv>
      {showModal && (
        <Modal
          close={() => setShowModal(false)}
          onSubmit={(e) => submitHandler(e)}
        >
          <DisplayObject obj={otherMembers} />
        </Modal>
      )}
    </>
  );
}

export default FormOthers;
