import styled from 'styled-components';
import { BsPerson, BsFillPersonFill } from 'react-icons/bs';
import useUser from '../../hooks/useUser';
import { useEffect, useState } from 'react';

export default function RoomItem({ room, selectedRoom, setSelectedRoom, handleChangeRoom }) {
  const { id: userId } = useUser();
  const findUser = room.Booking.some((b) => b.userId === userId);

  const [userIcon, setUserIcon] = useState(findUser);
  const [select, setSelect] = useState(false);

  const quantity = Array.from({ length: room.capacity });
  const spots = markCapacity(quantity, room.Booking);
  const [booked, setBooked] = useState(spots);

  useEffect(() => {
    const newSpots = markCapacity(quantity, room.Booking);
    setBooked(newSpots);
  }, [room]);

  useEffect(() => {
    if (!selectedRoom && findUser) {
      setSelect(true);
    }
    if (selectedRoom === room.id) {
      setSelect(true);
    } else {
      setSelect(false);
    }
  }, [selectedRoom]);

  const handleRoomClick = (roomId) => {
    handleChangeRoom(roomId);
    setSelectedRoom(roomId);
  };

  return (
    <>
      <RoomStyle
        disabled={quantity.length === room.Booking.length}
        background={select && '#FFEED2'}
        onClick={() => handleRoomClick(room.id)}
      >
        <div>{room.name}</div>
        <div>
          {booked.map((p, index) =>
            p ? (
              <BsFillPersonFill key={index} size={22} color={p.userId === userId && '#FF4791'} />
            ) : (
              <BsPerson key={index} size={22} />
            )
          )}
        </div>
      </RoomStyle>
    </>
  );
}

function markCapacity(quantity, bookings) {
  const result = [...quantity];
  for (let i = 0; i < bookings.length; i++) {
    result[result.length - 1 - i] = bookings[i];
  }
  return result;
}

const RoomStyle = styled.button`
  font-family: 'Roboto', 'Helvetica', 'Arial', sans-serif;
  font-size: 20px;
  font-weight: 700;
  line-height: 23px;
  letter-spacing: 0em;
  text-align: center;
  background: ${({ background }) => background || '#ffff'};
  cursor: pointer;
  width: 190px;
  height: 45px;
  border-radius: 10px;
  border: 1px solid #cecece;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 9px 10px 9px 16px;
  :disabled {
    cursor: default;
    background: ${({ background }) => background || '#e9e9e9'};
  }
  div {
    display: flex;
    align-items: center;
  }
`;
