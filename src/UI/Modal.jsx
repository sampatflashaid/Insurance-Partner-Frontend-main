import { createPortal } from 'react-dom';
import styled from 'styled-components';
import { HiXMark } from 'react-icons/hi2';
import { StyledButton } from './StyledTags';

const StyledModal = styled.div`
  position: fixed;
  width: max-content;
  top: 50%;
  left: 50%;
  background-color: #fff;
  border-radius: 9px;
  box-shadow: 0 2.4rem 3.2rem rgba(0, 0, 0, 0.4);
  transform: translate(-50%, -50%);
  padding: 3.2rem 4rem;
  transition: all 0.5s;
`;

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  background-color: rgba(255, 255, 255, 0.1);
  z-index: 1000;
  transition: all 0.5s;
  height: 100vh;
`;

const Button = styled.button`
  background: none;
  border: none;
  padding: 0.4rem;
  border-radius: 5px;
  transform: translateX(0.8rem);
  transition: all 0.2s;
  position: absolute;
  top: 1.9rem;
  right: 1.9rem;
  &:focus {
    outline: none;
  }

  & svg {
    width: 2.4rem;
    height: 2.4rem;
    color: #9ca3af;
  }
`;

export default function Modal({ close, children, onSubmit }) {
  return createPortal(
    <Overlay onClick={close}>
      <StyledModal onClick={(e) => e.stopPropagation()}>
        <Button>
          <HiXMark onClick={close} />
        </Button>
        <div>{children}</div>
        <StyledButton onClick={onSubmit}>Submit</StyledButton>
      </StyledModal>
    </Overlay>,
    document.body
  );
}
