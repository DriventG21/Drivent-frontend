import Loader from 'react-loader-spinner';
import styled from 'styled-components';

import Page from './Page';

import driventLogo from '../assets/images/drivent.png';

export default function Splash({ loading = false, message = '' }) {
  return (
    <StyledPage background="#FA4098">
      <Grid>
        {loading && <StyledLoader color="#FFFFFF" height={26} width={26} type="Oval" />}
        <img src={driventLogo} alt="Driven.t" />
      </Grid>
      {message && <Message>{message}</Message>}
    </StyledPage>
  );
}

const StyledPage = styled(Page)`
  color: white;
  padding: 20px;
`;

const Grid = styled.div`
  display: flex;
  align-items: center;

  user-select: none;

  & > *:not(:last-child) {
    margin-bottom: 0;
    margin-right: 10px;
  }
`;

const StyledLoader = styled(Loader)`
  position: relative;
  top: -4.5px;
`;

const Message = styled.div`
  font-size: 14px;
  margin-top: -10px;
  width: 100%;
  max-width: 320px;
  border-radius: 4px;
  padding: 10px;
  background-color: rgba(0, 0, 0, .2);
  color: white;
  text-align: center;
`;
