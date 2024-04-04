import { useState } from 'react';
import {
  Heading,
  StyledButton,
  StyledDiv,
  StyledFlex,
  StyledRadio,
} from '../../UI/StyledTags';
import Terms from './TermsNCondition/Terms';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { decryptData } from '../Utils/Decrypt';
import { useUpdateUser } from '../ReactQuery/useUpdateUser';
import Spinner from '../../UI/Spinner';
import toast from 'react-hot-toast';

function Concern() {
  const [isValid, setIsValid] = useState(true);
  const [showTerms, setShowTerms] = useState(false);
  const [accepted, setAccepted] = useState(false);
  const { updateUserPatch, isUpdating } = useUpdateUser();

  const { id, health_details } = decryptData('user');
  const navigate = useNavigate();

  const { state } = useLocation();
  const questionsArr = state || [];

  function handleSubmit() {
    if (!isValid) {
      navigate('/rejection');
    } else {
      const health_details = {
        admitted: false,
        diabetes: questionsArr[0].ans,
        healthDeceleration: true,
        hyperTension: questionsArr[1].ans,
      };
      const obj = {
        id,
        health_details,
      };
      updateUserPatch(obj, {
        onSuccess: (data) => {
          navigate('/checkout');
        },
      });
    }
  }

  if (Object.keys(health_details).length) {
    toast.error('Health details already updated!!');
    return (
      <StyledDiv>
        <h1>Health details already updated!!</h1>
        <Link to='/'>Go to home page</Link>
      </StyledDiv>
    );
  }
  if (isUpdating)
    return <Spinner msg='Updating your health details! Please wait...' />;

  return (
    <StyledDiv>
      <Heading>Medical history</Heading>
      <div>
        <h4>
          In the last three years, have you consulted a medical practitioner or
          been hospitalized for any kind of ailment/condition?
        </h4>
        <p>
          (Click "Continue" if hospitalized for malaria, dengue, typhoid, acute
          urinary tract infection, acute gastroenteritis, common cold,
          pregnancy, and any disease mentioned in point number 1, as well as
          bodily injuries.)
        </p>
      </div>
      <StyledFlex>
        <label>
          <StyledRadio
            onChange={() => setIsValid(false)}
            color='#dc2626'
            checked={!isValid}
          />
          YES
        </label>
        <label>
          <StyledRadio
            onChange={() => setIsValid(true)}
            checked={isValid}
            color='#16a34a'
          />
          NO
        </label>
      </StyledFlex>
      <div>
        <label>
          <input
            style={{ marginRight: '10px' }}
            type='checkbox'
            checked={accepted}
            onChange={() => setAccepted((old) => !old)}
          />
          <span
            style={{
              color: 'blue',
              cursor: 'pointer',
              textDecoration: 'underline',
            }}
            onClick={() => setShowTerms(true)}
          >
            Accept Terms and Conditions
          </span>
        </label>
      </div>
      <StyledButton
        size='med'
        $bgcolor={accepted ? 'yellow' : 'silver'}
        disabled={!accepted}
        style={{ cursor: accepted ? 'pointer' : 'not-allowed' }}
        onClick={handleSubmit}
      >
        Submit
      </StyledButton>
      {showTerms && (
        <Terms
          onAccept={() => {
            setAccepted(true);
            setShowTerms(false);
          }}
          onReject={() => {
            setAccepted(false);
            setShowTerms(false);
          }}
        />
      )}
    </StyledDiv>
  );
}

export default Concern;
