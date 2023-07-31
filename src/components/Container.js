import styled from 'styled-components';

export default styled.div`
  height: 100vh;
  max-height: ${props => props.height || '600px'};

  width: 100%;
  max-width: ${props => props.width || '1200px'};

  border-radius: 20px;
  background-color: #fff;
  box-shadow: 4px 4px 10px 5px rgba(0, 0, 0, .2);

  display: flex;
  overflow: hidden;

  @media (max-width: 600px) {
    border-radius: 0;
    min-height: 100vh;
    height: auto;
    max-height: initial;
    min-width: 100%;
    max-width: initial;
  }
`;
