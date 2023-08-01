import styled from 'styled-components';

export default function HotelItem({ hotelInfo }) {
  const { name, image, Rooms } = hotelInfo;
  const type = findAccommodationType(Rooms);
  const vacancy = findVacancy(Rooms);

  return (
    <HotelCard>
      <img src={image} alt={name} />
      <h3>{name}</h3>
      <div>
        <div>
          <p>Tipos de acomodação:</p>
          <span>{type}</span>
        </div>
        <div>
          <p>Vagas disponíveis:</p>
          <span>{vacancy}</span>
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
  background: #ebebeb;
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

function findAccommodationType(rooms) {
  const result = [];
  const hash = {};

  for (let i = 0; i < rooms.length; i++) {
    hash[rooms[i].capacity] = true;
  }

  if (hash[1]) {
    result.push('Single');
  }
  if (hash[2]) {
    result.push('Double');
  }
  if (hash[3]) {
    result.push('Triple');
  }

  return result.join(', ').replace(/,(?=[^,]*$)/, ' e');
}

function findVacancy(rooms) {
  let result = 0;
  for (let i = 0; i < rooms.length; i++) {
    result += rooms[i].capacity - rooms[i].Booking.length;
  }

  return result;
}
