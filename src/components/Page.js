import styled from 'styled-components';

export default styled.div`
  background: ${props => props.background};
  background-size: cover;
  min-height: 100vh;
  width: 100%;
  padding: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  font-size: 48px;

  & > *:not(:last-child) {
    margin-bottom: 24px;
  }

  & > * {
    text-align: center;
  }

  @media (max-width: 600px) {
    padding: 0;
  }
`;
