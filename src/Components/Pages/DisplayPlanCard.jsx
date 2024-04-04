import styled from 'styled-components';
import { StyledButton } from '../../UI/StyledTags';
import { useNavigate } from 'react-router-dom';
import { encryptData } from '../Utils/Encrypt';
import DisplayObject from '../../UI/DisplayObject';
import { decryptData } from '../Utils/Decrypt';
import { skip } from '../Utils/Constants';

const PlanCardWrapper = styled.div`
  border: 1px solid #ddd;
  padding: 15px;
  border-radius: 8px;
  background-color: #fff;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  min-width: 400px;

  @media (max-width: 768px) {
    /* Adjust styles for smaller screens */
    min-width: auto;
    width: 100%;
  }
`;

const PlanTitle = styled.h3`
  color: #333;
  padding: 5px;
  text-align: center;
  margin: 0;
  border-radius: 20px;
  background-color: ${(props) => props.color};
  width: 100%;
  color: white;
  margin-bottom: 10px;
`;

const StyledFooter = styled.footer`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  align-self: flex-end;
`;

const StyledLine = styled.div`
  border: 0.3px solid black;
  width: 100%;
`;

function DisplayPlanCard({ data }) {
  const { excludeHealth } = data;
  const navigate = useNavigate();
  const user = decryptData('user');
  const isHealthDetails = Boolean(
    Object.keys(user.health_details || {}).length
  );

  function buyClickHandler() {
    encryptData('plan', data);

    if (!isHealthDetails && !excludeHealth) {
      navigate('/healthconsent');
    } else {
      navigate('/checkout');
    }
  }

  const {
    data_to_save: { plan },
  } = data;

  return (
    <PlanCardWrapper>
      <PlanTitle color={plan.color}>{plan.product}</PlanTitle>
      <DisplayObject obj={plan} skip={skip} />
      <StyledFooter>
        <StyledLine />
        <>
          <p>Price: {plan.Price} / Year</p>
          <StyledButton size='small' onClick={buyClickHandler}>
            BUY
          </StyledButton>
        </>
      </StyledFooter>
    </PlanCardWrapper>
  );
}

export default DisplayPlanCard;
