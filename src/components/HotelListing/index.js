import { useEffect, useState } from 'react';
import styled from 'styled-components';
import useHotel from '../../hooks/api/useHotel';
import HotelItem from './HotelItem';

export default function HotelListing() {
  const [data, setData] = useState([]);
  const { hotels } = useHotel();

  useEffect(() => {
    if (hotels) {
      setData(hotels);
    }
  }, [hotels]);

  return (
    <PageContainer>
      <h2>Primeiro, escolha seu hotel</h2>
      <ul>
        {data && data.map((h) => (
          <HotelItem key={h.id} hotelInfo={h} />
        ))}
      </ul>
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
