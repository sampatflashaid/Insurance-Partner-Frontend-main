import { useNavigate } from 'react-router-dom';
import { StyledDiv } from '../../UI/StyledTags';

function NoDataFound() {
  const navigate = useNavigate();
  return (
    <StyledDiv>
      <h1>No data found</h1>
      <p style={{ color: 'blue' }} onClick={() => navigate('/')}>
        Go to Home
      </p>
    </StyledDiv>
  );
}

export default NoDataFound;
