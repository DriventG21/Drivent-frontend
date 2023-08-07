import styled from 'styled-components';

export default function BookedItem({ bookingInfo }) {
  const room = bookingInfo.Room;
  // const { id, name, image, vacancy, type, selected } = hotelInfo;

  let accomodation_type = '()';
  if (room.capacity === 1) {
    accomodation_type = '(Single)';
  } else if (room.capacity === 2) {
    accomodation_type = '(Double)';
  } else if (room.capacity === 3) {
    accomodation_type = '(Triple)';
  }

  return (
    <HotelCard selected={true}>
      <img src={room.Hotel.image} alt={room.Hotel.image} />
      <h3>{room.Hotel.name}</h3>
      <div>
        <div>
          <p>Quarto reservado:</p>
          <span>
            {room.name} {accomodation_type}
          </span>
        </div>
        <div>
          <p>Pessoas no seu quarto:</p>
          <span>{room.Booking.length > 1 ? `Você e mais ${room.Booking.length - 1} pessoas` : 'Somente você'}</span>
        </div>
      </div>
    </HotelCard>
  );
}

const HotelCard = styled.li`
  cursor: pointer;
  display: flex;
  flex-direction: column;
  min-width: 196px;
  height: 264px;
  border-radius: 10px;
  background: ${({ selected }) => (selected ? '#FFEED2' : '#ebebeb')};
  padding: 16px 14px;
  gap: 10px;
  color: #3c3c3c;

  img {
    width: 100%;
    height: 109px;
    border-radius: 5px;
    object-fit: cover;
  }

  h3 {
    font-size: 20px;
    font-weight: 400;
    line-height: 23px;
    letter-spacing: 0em;
    text-align: left;
    color: #343434;
  }

  > div {
    gap: 14px;
  }

  div {
    display: flex;
    flex-direction: column;

    p {
      font-size: 12px;
      font-weight: 700;
      line-height: 14px;
      letter-spacing: 0em;
      text-align: left;
      margin-bottom: 2px;
    }

    span {
      font-size: 12px;
      font-weight: 400;
      line-height: 14px;
      letter-spacing: 0em;
      text-align: left;
    }
  }
`;
