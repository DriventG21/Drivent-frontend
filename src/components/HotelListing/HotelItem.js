import styled from 'styled-components';

export default function HotelItem({ hotelInfo, handleSelection }) {
  const { id, name, image, vacancy, type, selected } = hotelInfo;

  return (
    <HotelCard onClick={() => handleSelection(id)} selected={selected}>
      <img src={image} alt={name} />
      <h3>{name}</h3>
      <div>
        <div>
          <p>Tipos de acomodação:</p>
          <span>{type.join(', ').replace(/,(?=[^,]*$)/, ' e')}</span>
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
