import styled from 'styled-components';
import useGetPlans from '../ReactQuery/useGetPlans';
import Spinner from '../../UI/Spinner';
import { StyledDiv } from '../../UI/StyledTags';
import DisplayPlanCard from './DisplayPlanCard';

const PlansContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 20px;
  padding: 20px;
  background-color: #f0f0f0; /* Background color for the container */

  @media (max-width: 767px) {
    justify-content: flex-start; /* Change alignment for smaller screens */
  }
`;

const DisplayPlan = () => {
  const id = sessionStorage.getItem('id');
  const { data, isLoading } = useGetPlans(id);
  if (isLoading) return <Spinner msg='Getting plan!! Please wait...' />;
  if (data && !data.length) return <StyledDiv>No plans to display</StyledDiv>;

  return (
    <PlansContainer>
      {data &&
        data.map((each, ind) => <DisplayPlanCard data={each} key={ind} />)}
    </PlansContainer>
  );
};

export default DisplayPlan;
