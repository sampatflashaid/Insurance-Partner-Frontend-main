import React, { useState } from 'react';
import { StyledDiv, StyledButton, StyledRadio } from '../../UI/StyledTags';
import styled from 'styled-components';
import { useNavigate, Link } from 'react-router-dom';
import { decryptData } from '../Utils/Decrypt';
import toast from 'react-hot-toast';

const RadioDiv = styled.div`
  display: flex;
  gap: 50px;
`;

const ButtonDiv = styled.div`
  display: flex;
  gap: 50px;
`;

const HealthConsent = () => {
  const [currQuestion, setCurrQuestion] = useState(0);
  const [selected, setSelected] = useState('');
  const [questionsArr, setQuestionsArr] = useState([
    { que: 'Do you have diabetes?', ans: null },
    { que: 'Do you have hypertension?', ans: null },
    {
      que: 'Either diabetes or hypertension diagnosed for more than three years?',
      ans: null,
    },
  ]);
  const navigate = useNavigate();

  const { health_details } = decryptData('user');

  const handleAnswerChange = (answer) => {
    setSelected(answer);
    const newArr = [...questionsArr];
    newArr[currQuestion].ans = answer === 'yes';
    setQuestionsArr(newArr);
  };

  const isValid = questionsArr.filter((q) => q.ans === false).length >= 2;

  if (Object.keys(health_details).length) {
    toast.error('Health details already updated!!');
    return (
      <StyledDiv>
        <h1>Health details already updated!!</h1>
        <Link to='/'>Go to home page</Link>
      </StyledDiv>
    );
  }

  return (
    <StyledDiv>
      <h1>{questionsArr[currQuestion].que}</h1>
      <RadioDiv>
        <label>
          <StyledRadio
            type='radio'
            value='yes'
            onChange={() => handleAnswerChange('yes')}
            checked={selected === 'yes'}
          />
          YES
        </label>
        <label>
          <StyledRadio
            type='radio'
            value='no'
            onChange={() => handleAnswerChange('no')}
            checked={selected === 'no'}
          />
          NO
        </label>
      </RadioDiv>
      <ButtonDiv>
        {currQuestion > 0 && (
          <StyledButton
            size='small'
            onClick={() => {
              const newArr = [...questionsArr];
              newArr[currQuestion].ans = '';
              setQuestionsArr(newArr);
              setCurrQuestion((old) => old - 1);
              setSelected('');
            }}
          >
            Previous
          </StyledButton>
        )}
        {!isValid && currQuestion < questionsArr.length - 1 && (
          <StyledButton
            size='small'
            onClick={() => {
              setCurrQuestion((old) => old + 1);
              setSelected('');
            }}
            disabled={!selected}
          >
            Next
          </StyledButton>
        )}
        {(isValid || currQuestion === questionsArr.length - 1) && (
          <StyledButton
            size='small'
            onClick={() => {
              if (!isValid) {
                navigate('/rejection');
              } else {
                navigate('/concern', { state: questionsArr });
              }
            }}
          >
            Submit
          </StyledButton>
        )}
      </ButtonDiv>
    </StyledDiv>
  );
};

export default HealthConsent;
