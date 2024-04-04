import styled, { createGlobalStyle } from 'styled-components';
import { bacColor, btn } from './Helper';
import { Link } from 'react-router-dom';

export const GlobalStyle = createGlobalStyle`
body {
  font-family: 'Poppins', sans-serif;
  /* Add more global styles here */
}
`;

export const StyledDiv = styled.div`
  margin: 30px auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: ${(props) => props.gap || '50px'};
  text-align: center;

  @media (min-width: 768px) {
    /* Apply these styles for screens 768px and larger */
    margin-top: 100px;
    max-width: 600px;
  }

  @media (min-width: 1024px) {
    /* Apply these styles for screens 1024px and larger */
    margin-top: 100px;
    max-width: 600px;
  }

  @media (min-width: 1200px) {
    /* Apply these styles for screens 1200px and larger */
    margin-top: 100px;
    max-width: 600px;
  }
`;

export const Heading = styled.h1`
  font-size: 26px;
`;

export const StyledLabel = styled.label`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const StyledSelect = styled.select`
  font-size: 20px;
  width: 85%;
  background-color: ${bacColor.input};
  border: none;
  height: 50px;
  border-radius: 20px;
  padding: 10px;
`;
export const StyledOption = styled.option`
  background-color: ${bacColor.input};
`;

export const StyledInput = styled.input`
  font-size: 20px;
  width: 80%;
  background-color: ${bacColor.input};
  border: none;
  height: 30px;
  border-radius: 20px;
  padding: 10px;
`;

export const StyledRadio = styled.input.attrs({ type: 'radio' })`
  width: ${(props) => props.width || '80%'};
  accent-color: ${(props) => props.color || '#d97706'};

  border: none;
  height: 30px;
  border-radius: 20px;
  padding: 10px;
`;

export const StyledLink = styled(Link)`
  color: #3498db; /* Change the color as needed */
  text-decoration: none;
  font-weight: bold;
  font-size: 16px;
  /* Add more styles as needed */

  &:hover {
    text-decoration: underline;
  }
`;

export const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  gap: 15px;
`;

export const StyledButton = styled.button`
  border: none;
  ${(props) => (props.size ? btn[props.size] : btn.small)}
  background-color: ${(props) => bacColor[props.bgcolor] || '#FFBE00'};
  color: #ffffff;
  cursor: ${(props) =>
    props.bgcolor === 'silver' ? 'not-allowed' : 'pointer'};
  border-radius: 8px;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: ${(props) => bacColor[props.bgcolor] || '#FFD44E'};
    /* Add more hover styles if needed */
  }

  @media (min-width: 768px) {
    ${btn.large}
  }
`;

export const StyledFlex = styled.div`
  margin: 0 auto;
  display: flex;
  width: 50%;
  align-items: center;
  justify-content: space-around;
`;
