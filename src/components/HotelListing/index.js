import axios from 'axios';
import { useEffect, useState } from 'react';
import styled from 'styled-components';
import useHotel from '../../hooks/api/useHotel';
import useToken from '../../hooks/useToken';
import HotelItem from './HotelItem';
import BookedItem from './BookedItem';
import RoomItem from './RoomItem';
import useUser from '../../hooks/useUser';
import { useBooking } from '../../hooks/api/useBooking';

export default function HotelListing() {
  const { id: userId } = useUser();
  const token = useToken();
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);
  const hotelsData = useHotel();
  const { hotels, hotelsError } = hotelsData;
  const [rooms, setRooms] = useState(null);

  const { booking: bookingData, getBooking } = useBooking();
  const booking = bookingData;
  const [bookingComplete, setBookingComplete] = useState(false);

  const [selectedRoom, setSelectedRoom] = useState(null);

  useEffect(() => {
    getBooking();
    if (booking && !hotelsError) {
      const formatedHotels = hotels.map((e) => ({ ...e, selected: false }));
      setBookingComplete(true);
      setData(formatedHotels);
    } else if (hotels) {
      const formatedHotels = hotels.map((e) => ({ ...e, selected: false }));
      setBookingComplete(false);
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
        setSelectedRoom(null);
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

  function filterUser() {
    const filtered = [];
    for (let i = 0; i < rooms.length; i++) {
      const room = {
        ...rooms[i],
        Booking: rooms[i].Booking.filter((b) => b.userId !== userId),
      };
      filtered.push(room);
    }
    return filtered;
  }

  function handleChangeRoom(roomId) {
    const roomWithoutUser = filterUser();
    const newChosenRoom = roomWithoutUser.map((r) => {
      if (r.id === roomId) {
        return { ...r, Booking: [...r.Booking, { userId }] };
      } else {
        return r;
      }
    });
    setRooms(newChosenRoom);
  }

  async function changeBooking() {
    setBookingComplete(false);
  }

  async function postBooking() {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const body = {
      roomId: selectedRoom,
    };
    try {
      await axios.post(`${process.env.REACT_APP_API_BASE_URL}/booking`, body, config).catch((err) => console.log(err));
      await getBooking();
      setBookingComplete(true);
    } catch (err) {
      console.log(err);
    }
  }

  async function updateBooking() {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const body = {
      roomId: selectedRoom,
    };
    try {
      if (selectedRoom === booking.Room.id) {
        return true;
      }
      await axios
        .put(`${process.env.REACT_APP_API_BASE_URL}/booking/${booking.id}`, body, config)
        .catch((err) => console.log(err));
      await getBooking();
      setBookingComplete(true);
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <PageContainer>
      {booking && bookingComplete === true && (
        <>
          <h2>Você já escolheu seu quarto</h2>
          <ul>
            <BookedItem key={booking.Room.hotelId} bookingInfo={booking} />
          </ul>
          <BookingButton onClick={() => changeBooking()}>
            <h4>TROCAR DE QUARTO</h4>
          </BookingButton>
        </>
      )}
      {hotels && bookingComplete === false && (
        <>
          <h2>Primeiro, escolha seu hotel</h2>
          <ul>
            {data.map((h) => (
              <HotelItem key={h.id} hotelInfo={h} handleSelection={handleSelection} />
            ))}
          </ul>
        </>
      )}
      {rooms && bookingComplete === false && (
        <>
          <h2>Ótima pedida! Agora escolha seu quarto:</h2>
          <RoomList>
            {rooms.map((r) => (
              <RoomItem
                key={r.id}
                room={r}
                selectedRoom={selectedRoom}
                setSelectedRoom={setSelectedRoom}
                handleChangeRoom={handleChangeRoom}
              />
            ))}
          </RoomList>
          {!booking && selectedRoom && (
            <BookingButton onClick={() => postBooking()}>
              <h4>RESERVAR QUARTO</h4>
            </BookingButton>
          )}
          {booking && selectedRoom && (
            <BookingButton onClick={() => updateBooking()}>
              <h4>CONFIRMAR TROCA</h4>
            </BookingButton>
          )}
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

const BookingButton = styled.div`
  width: 182px;
  height: 37px;
  background: #e0e0e0;
  box-shadow: 0px 2px 10px 0px #00000040;
  border-radius: 4px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 38px;
  cursor: pointer;
  h4 {
    color: #000;
    text-align: center;
    font-size: 14px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
  }
`;
