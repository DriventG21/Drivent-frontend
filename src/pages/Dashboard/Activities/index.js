import styled from 'styled-components';
import ActivityListing from '../../../components/Dashboard/ActivityListing';

export default function Activities() {
  return (
    <PageContainerStyle>
      <h1>Escolha de atividades</h1>
      <ActivityListing />
    </PageContainerStyle>
  );
}

const PageContainerStyle = styled.div`
  display: flex;
  flex-direction: column;
  gap: 36px;
  max-height: 100%;
  overflow-y: scroll;
  ::-webkit-scrollbar {
    display: none;
  }

  h1 {
    font-family: 'Roboto', 'Helvetica', 'Arial', sans-serif;
    font-size: 34px;
    font-weight: 400;
    line-height: 40px;
    letter-spacing: 0em;
    text-align: left;
  }
`;
