import styled from 'styled-components';
import { StyledButton } from '../../UI/StyledTags';
import DisplayObject from '../../UI/DisplayObject';
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

const heading = {
  OFFER: 'My-Plan',
  COI: 'COI',
  ECARD: 'ECARD',
  INVOICE: 'INVOICE',
  CONSENT: 'CONSENT',
};

function BoughtPlanCard({ data }) {
  const { plan, links } = data[1];
  const linksArr = Object.entries(links || {});

  return (
    <PlanCardWrapper>
      <PlanTitle color={plan.color}>{plan.product}</PlanTitle>
      <DisplayObject obj={plan} skip={skip} />
      <StyledFooter>
        <StyledLine />
        <h3>DOWNLOAD</h3>
        <div
          style={{
            display: 'flex',
            gap: '5px',
            flexWrap: 'wrap',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          {linksArr.map(([key, val]) => (
            <StyledButton key={key} onClick={() => window.open(val, '_blank')}>
              {heading[key.split('-')[0]]}
            </StyledButton>
          ))}
        </div>
      </StyledFooter>
    </PlanCardWrapper>
  );
}

export default BoughtPlanCard;
