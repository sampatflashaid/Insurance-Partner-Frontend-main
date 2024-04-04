import styled, { keyframes } from 'styled-components';
import successIcon from '../../assets/success.png';
import { getCurrentISTime } from '../Utils/Constants';
import { useNavigate } from 'react-router-dom';
import { decryptData } from '../Utils/Decrypt';

const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(-10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const iconFadeIn = keyframes`
  from {
    opacity: 0;
    transform: scale(0);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
`;

const Container = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  margin-top: 10px;
  padding-top: 20px;
`;

const ConfirmCard = styled.div`
  background-color: #fff;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
  padding: 40px;
  flex-direction: column;
  width: 100%;
  animation: ${fadeIn} 0.5s ease forwards;
`;

const SuccessIcon = styled.img`
  width: 80px;
  height: 80px;
  margin-bottom: 20px;
  animation: ${iconFadeIn} 2s ease 0.5s forwards;
`;

const Heading2 = styled.h2`
  color: #22b66e;
`;

const CustomerDetails = styled.div`
  p {
    margin: 10px 0;
  }
`;

const AuthenticityMessage = styled.p`
  font-style: italic;
  margin-top: 20px;
`;

function Confirmation() {
  const user = decryptData('user');
  const plan = decryptData('plan');
  const { name } = decryptData('plan');

  const {
    primary_details: { fullname, contact },
    id,
    plans,
  } = user;

  const currPlan = plans[name];

  const {
    payment_details: { amount_paid: amount, id: pay_id },
  } = currPlan;

  const navigate = useNavigate();

  function handleProceed() {
    navigate('/plandetails');
    sessionStorage.removeItem('plan');
  }

  return (
    <Container>
      <ConfirmCard>
        <SuccessIcon src={successIcon} alt='Success Icon' />
        <Heading2>Payment Successful</Heading2>
        <CustomerDetails>
          <p>
            <strong>Customer Name:</strong> {fullname}
          </p>
          <p>
            <strong>FA Membership Number:</strong> {id}
          </p>
          <p>
            <strong>Contact Number:</strong> {contact}
          </p>
          <p>
            <strong>Amount:</strong> ₹{amount}
          </p>
          <p>
            <strong>Payment reference:</strong> {pay_id}
          </p>
          <p>
            <strong>Transaction Time:</strong> {getCurrentISTime()}
          </p>
        </CustomerDetails>
        <AuthenticityMessage>
          This confirmation is issued by Flashaid.
        </AuthenticityMessage>
        <p style={{ color: 'blue', cursor: 'pointer' }} onClick={handleProceed}>
          Click to proceed
        </p>
      </ConfirmCard>
    </Container>
  );
}

export default Confirmation;
