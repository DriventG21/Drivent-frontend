import { useEffect, useState } from 'react';
import styled from 'styled-components';
import useHotel from '../../hooks/api/useHotel';
import HotelItem from './HotelItem';

export default function HotelListing() {
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);
  const hotelsData = useHotel();
  const { hotels, hotelsError } = hotelsData;

  useEffect(() => {
    if (hotels) {
      setData(hotels);
    }
    if (hotelsError) {
      const data = hotelsError.response.data;
      const errorMessage = {
        'Payment Required': ['Você precisa ter confirmado pagamento antes de fazer a escolha de hospedagem'],
        'Invalid ticket type': [
          'Sua modalidade de ingresso não inclui hospedagem',
          'Prossiga para a escolha de atividades',
        ],
      };
      setError(errorMessage[data]);
    }
  }, [hotels, hotelsError]);

  return (
    <PageContainer>
      {hotels && (
        <>
          <h2>Primeiro, escolha seu hotel</h2>
          <ul>
            {data.map((h) => (
              <HotelItem key={h.id} hotelInfo={h} />
            ))}
          </ul>
        </>
      )}
      {error && (
        <ErrorContainer>
          <ul>
            {error.map((e) => (
              <div>{e}</div>
            ))}
          </ul>
        </ErrorContainer>
      )}
    </PageContainer>
  );
}

const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  font-family: 'Roboto', 'Helvetica', 'Arial', sans-serif;
  gap: 18px;

  h2 {
    font-size: 20px;
    font-weight: 400;
    line-height: 23px;
    letter-spacing: 0em;
    text-align: left;
    color: #8e8e8e;
  }

  ul {
    width: 100%;
    overflow-x: scroll;
    scroll-behavior: smooth;
    display: flex;
    gap: 19px;
    ::-webkit-scrollbar {
      height: 8px;
      width: 8px;
    }
    ::-webkit-scrollbar-thumb {
      background-color: #c9c6c6;
      border-radius: 4px;
    }
  }
`;

const ErrorContainer = styled.div`
  font-size: 20px;
  font-weight: 400;
  line-height: 23px;
  letter-spacing: -0.05em;
  text-align: center;
  color: #8e8e8e;
  align-self: center;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 48%;
  height: 500px;
  ul {
    display: flex;
    flex-direction: column;
    width: 100%;
    gap: 0px;
  }
`;
