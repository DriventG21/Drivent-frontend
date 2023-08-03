import axios from 'axios';
import { useEffect, useState } from 'react';
import styled from 'styled-components';
import useHotel from '../../hooks/api/useHotel';
import useToken from '../../hooks/useToken';
import HotelItem from './HotelItem';
import BookedItem from './BookedItem';
import RoomItem from './RoomItem';
import { useBooking } from '../../hooks/api/useBooking';

export default function HotelListing() {
  const token = useToken();
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);
  const hotelsData = useHotel();
  const { hotels, hotelsError } = hotelsData;
  const [rooms, setRooms] = useState(null);
  const [reservedRoom, setReservedRoom] = useState([]);

  const { booking: bookingData, bookingLoading, getBooking } = useBooking();
  const booking = bookingData;

  useEffect(() => {
    if (booking && !hotelsError) {
      const formatedHotels = hotels.map((e) => ({ ...e, selected: false }));
      setData(formatedHotels);
    } else if (hotels) {
      const formatedHotels = hotels.map((e) => ({ ...e, selected: false }));
      setData(formatedHotels);
    } else if (hotelsError) {
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

  function handleSelection(hotelId) {
    let aux = false;
    const hotelList = data.map((h) => {
      if (h.id === hotelId) {
        aux = !h.selected;
        h.selected = !h.selected;
      } else {
        h.selected = false;
      }
      return h;
    });

    setData(hotelList);

    if (aux) {
      updateRoomList(hotelId);
    } else {
      setRooms(null);
    }
  }

  function updateRoomList(hotelId) {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    axios
      .get(`${process.env.REACT_APP_API_BASE_URL}/hotels/${hotelId}`, config)
      .then(({ data }) => {
        setRooms(data.Rooms);
      })
      .catch((err) => console.log(err));
  }

  return (
    <PageContainer>
      {booking && (
        <>
          <h2>Você já escolheu seu quarto</h2>
          <ul>
            <BookedItem key={booking.Room.hotelId} bookingInfo={booking} />
          </ul>
        </>
      )}
      {hotels && !booking &&(
        <>
          <h2>Primeiro, escolha seu hotel</h2>
          <ul>
            {data.map((h) => (
              <HotelItem key={h.id} hotelInfo={h} handleSelection={handleSelection} />
            ))}
          </ul>
        </>
      )}
      {rooms && (
        <>
          <h2>Ótima pedida! Agora escolha seu quarto:</h2>
          <RoomList>
            {rooms.map((r) => (
              <RoomItem key={r.id} room={r} />
            ))}
          </RoomList>
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

const RoomList = styled.ul`
  display: flex;
  flex-wrap: wrap;
`;
