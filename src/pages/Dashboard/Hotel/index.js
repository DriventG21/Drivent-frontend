import styled from 'styled-components';
import HotelListing from '../../../components/HotelListing';

export default function Hotel() {
  return (
    <PageContainerStyle>
      <h1>Escolha de hotel e quarto</h1>
      <HotelListing />
    </PageContainerStyle>
  );
}

const PageContainerStyle = styled.div`
  display: flex;
  flex-direction: column;
  gap: 36px;

  h1 {
    font-family: 'Roboto', 'Helvetica', 'Arial', sans-serif;
    font-size: 34px;
    font-weight: 400;
    line-height: 40px;
    letter-spacing: 0em;
    text-align: left;
  }
`;
