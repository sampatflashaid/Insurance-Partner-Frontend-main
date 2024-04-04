import { useEffect } from 'react';
import useGetPlanDetails from '../ReactQuery/useGetPlanDetails';
import Spinner from '../../UI/Spinner';
import styled from 'styled-components';
import { StyledDiv } from '../../UI/StyledTags';
import BoughtPlanCard from './BoughtPlanCard';
import { setInsurancePartnerWebEngageAttribute } from '../Utils/WebEngageUtils';

const PlansContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 20px;
  padding: 20px;
  background-color: #f0f0f0; /* Background color for the container */
  margin-top: 3%;

  @media (max-width: 767px) {
    justify-content: flex-start; /* Change alignment for smaller screens */
  }
`;

function BoughtPlanDetails() {
  const { getPlans, isPending, data } = useGetPlanDetails();
  useEffect(() => {
    getPlans();
  }, [getPlans]);

  if (isPending) return <Spinner msg='Loading plans!! Please wait...' />;

  const plans = Object.entries(data || {});
  if (!plans.length) return <StyledDiv>You do not have any plan!</StyledDiv>;
  setInsurancePartnerWebEngageAttribute("my plans",plans)
  return (
    <PlansContainer>
      {plans.map((each, ind) => (
        <BoughtPlanCard data={each} key={ind} />
      ))}
    </PlansContainer>
  );
}

export default BoughtPlanDetails;
