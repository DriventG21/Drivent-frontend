import styled from 'styled-components';

import Page from '../components/Page';
import { StyledContainer as Container } from '../components/Auth';

export default function Dashboard({ background, children }) {
  return (
    <Page background={background}>
      <StyledContainer width="1040px" height="680px">
        {children}
      </StyledContainer>
    </Page>
  );
}

const StyledContainer = styled(Container)`
  display: flex;
  justify-content: flex-start;
  align-items: stretch;
  flex-direction: row;
  padding: 0;
  
  & > * {
    text-align: initial;
  }

  @media (max-width: 600px) {
    flex-direction: column-reverse;
  }
`;
