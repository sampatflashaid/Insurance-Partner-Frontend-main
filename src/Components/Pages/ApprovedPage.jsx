import React from 'react';
import { Heading, StyledDiv } from '../../UI/StyledTags';

function ApprovedPage() {
  return (
    <StyledDiv>
      <Heading>
        <p>You already bought a plan! for product details Please login</p>
        <a
          href='https://care.flashaid.in/'
          target='_blank'
          rel='noopener noreferrer'
        >
          https://care.flashaid.in/
        </a>{' '}
      </Heading>
    </StyledDiv>
  );
}

export default ApprovedPage;
