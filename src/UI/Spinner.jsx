import styled, { keyframes } from 'styled-components';

const rotate = keyframes`
  to {
    transform: rotate(1turn)
  }
`;

const StyledSpinner = styled.div`
  margin: 4.8rem auto;

  width: 6.4rem;
  aspect-ratio: 1;
  border-radius: 50%;
  background: radial-gradient(farthest-side, #4f46e5 94%, #0000) top/10px 10px
      no-repeat,
    conic-gradient(#0000 30%, #4f46e5);
  -webkit-mask: radial-gradient(farthest-side, #0000 calc(100% - 10px), #000 0);
  animation: ${rotate} 1.5s infinite linear;
`;

const StyledContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin: 0 auto;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.3); /* Semi-transparent background color */
  backdrop-filter: blur(1px); /* Apply a blur effect */
  z-index: 999; /* Ensure it's on top of everything */
`;

const StyledParagraph = styled.p`
  font-size: 2rem;
  font-family: 'Sono';

  @media screen and (max-width: 768px) {
    /* Adjust font size for smaller screens (e.g., mobile phones) */
    font-size: 1rem;
  }
  @media screen and (max-width: 400px) {
    /* Adjust font size for smaller screens (e.g., mobile phones) */
    font-size: 0.7rem;
  }
`;

function Spinner({ msg }) {
  return (
    <StyledContainer>
      <StyledSpinner />
      <StyledParagraph>{msg}</StyledParagraph>
    </StyledContainer>
  );
}

export default Spinner;
