import { decryptData } from '../Utils/Decrypt';
import { skip } from '../Utils/Constants';
import Spinner from '../../UI/Spinner';
import DisplayObject from '../../UI/DisplayObject';
import { StyledButton } from '../../UI/StyledTags';
import styled from 'styled-components';
import { generateOrder } from '../Utils/generateOrder';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import NoDataFound from './NoDataFound';
import { useState } from 'react';
import { useUpdateUserPut } from '../ReactQuery/useUpdateUserPut';

const PlanCardWrapper = styled.div`
  border: 1px solid #ddd;
  padding: 15px;
  border-radius: 8px;
  background-color: #fff; /* Background color for each plan card */
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  max-width: 500px;
  margin: 0 auto;
  margin-top: 5%;
`;

const PlanTitle = styled.h1`
  color: #333; /* Plan title color */
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
  align-items: center;
  justify-content: space-between;
  width: 100%;
`;

const StyledPrice = styled.div`
  width: 40%;
  background-color: #edebdd;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  color: black;
  padding: 10px;
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const PriceDiv = styled.div`
  margin: 0;
  width: 100%;
  display: flex;
  justify-content: space-between;
`;
const PriceDetail = styled.p`
  padding: 0;
  margin: 0;
`;

function CheckOut() {
  const { updateUserPut, isUpdating } = useUpdateUserPut();
  const [inProcess, setInProcess] = useState(false);

  const navigate = useNavigate();
  const plan = decryptData('plan');
  if (!plan) return <NoDataFound />;
  const {
    data_to_save: {
      plan: data,
      FA: { Insurance, TPA },
    },
  } = plan;

  const { Price: amount, plan: dataPlan, color, total: totalMembers } = data;

  const {
    primary_details: { fullname: name, contact, email },
    id,
  } = decryptData('user');

  const checkOutHandler = (e) => {
    e.preventDefault();
    setInProcess(true);
    const Obj = {
      name,
      contact,
      email,
      id,
      amount,
      plan: dataPlan,
      products: plan.plan,
      Insurance,
      TPA,
      totalMembers,
      boughtPlan: plan,
    };
    generateOrder(Obj, navigate, updateUserPut, setInProcess);
  };

  if (!plan) {
    toast.error('No plan selected!!');
    return <NoDataFound />;
  }
  const base = +amount;
  const gst = +(amount * 0.18).toFixed(2);
  const total = (base + gst).toFixed(2);

  if (isUpdating)
    return <Spinner msg='Updating your payment details! Please wait...' />;

  return (
    <PlanCardWrapper>
      <PlanTitle color={color}>{plan.name}</PlanTitle>
      <DisplayObject obj={data} skip={skip} />
      <StyledFooter>
        <StyledPrice>
          <PriceDiv>
            <PriceDetail>Base Price:</PriceDetail>
            <PriceDetail>{base.toFixed(2)}</PriceDetail>
          </PriceDiv>
          <PriceDiv>
            <PriceDetail>Gst:</PriceDetail>{' '}
            <PriceDetail>{gst.toFixed(2)}</PriceDetail>
          </PriceDiv>
          <PriceDiv>
            <PriceDetail>Total:</PriceDetail>
            <PriceDetail>{total}</PriceDetail>
          </PriceDiv>
        </StyledPrice>
        <StyledButton size='med' onClick={checkOutHandler} disabled={inProcess}>
          {inProcess ? 'Processing..' : 'CHECKOUT'}
        </StyledButton>
      </StyledFooter>
    </PlanCardWrapper>
  );
}

export default CheckOut;
