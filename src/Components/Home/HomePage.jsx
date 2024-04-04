import styled from 'styled-components';
import DisplayPlan from '../Pages/DisplayPlan';

const Container = styled.div`
  @media (min-width: 768px) {
    /* Apply these styles for screens 768px and larger */
    margin-top: 100px;
  }

  @media (min-width: 1024px) {
    /* Apply these styles for screens 1024px and larger */
    margin-top: 100px;
  }

  @media (min-width: 1200px) {
    /* Apply these styles for screens 1200px and larger */
    margin-top: 100px;
  }
`;

function HomePage() {
  return (
    <Container>
      <DisplayPlan />
    </Container>
  );
}

export default HomePage;
