import axios from 'axios';
import { useEffect, useState } from 'react';
import styled from 'styled-components';

export default function Tickets({ enrollment, ticketTypes, config }) {
  const [isRemote, setIsRemote] = useState('');
  const [includesHotel, setIncludesHotel] = useState('');
  const [types, setTypes] = useState();
  const [hotels, setHotels] = useState();
  const [notRemoteWithoutHotelPrice, setNotRemoteWithoutHotelPrice] = useState(0);

  const [typePrice, setTypePrice] = useState(0);
  const [hotelPrice, setHotelPrice] = useState(0);

  useEffect(() => {
    formatTypes();
    formatHotels();
  }, [ticketTypes, notRemoteWithoutHotelPrice]);

  function formatTypes() {
    const formatted = [];

    ticketTypes?.forEach((type) => {
      if (!type.isRemote && !type.includesHotel) {
        setNotRemoteWithoutHotelPrice(type.price);
        formatted.push({
          name: 'Presencial',
          price: type.price,
          remote: false,
        });
      }

      if (type.isRemote)
        formatted.push({
          name: 'Online',
          price: type.price,
          remote: true,
        });
    });

    setTypes(formatted);
  }

  function formatHotels() {
    const formatted = [];

    ticketTypes?.forEach((hotel) => {
      if (!hotel.isRemote && !hotel.includesHotel) {
        formatted.push({
          name: 'Sem Hotel',
          price: 0,
          hotel: false,
        });
      }

      if (!hotel.isRemote && hotel.includesHotel)
        formatted.push({
          name: 'Com Hotel',
          price: hotel.price - notRemoteWithoutHotelPrice,
          hotel: true,
        });
    });

    setHotels(formatted);
  }

  function handleTypeClick(type) {
    setIsRemote(type.remote);
    setTypePrice(type.price);

    if (type.remote) {
      setHotelPrice(0);
      setIncludesHotel(false);
    }

    if (!type.remote) setIncludesHotel();
  }

  function handleHotelClick(hotel) {
    setIncludesHotel(hotel.hotel);
    setHotelPrice(hotel.price);
  }

  function handleSubmit() {
    let ticketTypeId;

    if (includesHotel === '') setIncludesHotel(false);

    ticketTypes?.forEach((type) => {
      if (type.isRemote === isRemote && type.includesHotel === includesHotel) ticketTypeId = type.id;
    });

    axios
      .post(`${process.env.REACT_APP_API_BASE_URL}/tickets`, { ticketTypeId }, config)
      .then((res) => alert('deu certo'))
      .catch((err) => alert('deu errado'));
  }

  return (
    <Container enrollment={enrollment}>
      <Header>Ingresso e pagamento</Header>
      {!enrollment ? (
        <NoEnrollment>Você precisa completar sua inscrição antes de prosseguir pra escolha de ingresso</NoEnrollment>
      ) : (
        <>
          <TypesContainer>
            <span className="header">Primeiro, escolha sua modalidade de ingresso</span>
            <div className="types">
              {types?.map((type) => (
                <Type key={type.name} onClick={() => handleTypeClick(type)} isRemote={isRemote} remote={type.remote}>
                  <span className="name">{type.name}</span>
                  <span className="price">R$ {type.price}</span>
                </Type>
              ))}
            </div>
          </TypesContainer>
          {isRemote === false && (
            <HotelsContainer>
              <span className="header">Ótimo! Agora escolha sua modalidade de hospedagem</span>
              <div className="hotels">
                {hotels?.map((hotel) => (
                  <Hotel
                    key={hotel.name}
                    onClick={() => handleHotelClick(hotel)}
                    includesHotel={includesHotel}
                    hotel={hotel.hotel}
                  >
                    <span className="name">{hotel.name}</span>
                    <span className="price">+ R$ {hotel.price}</span>
                  </Hotel>
                ))}
              </div>
            </HotelsContainer>
          )}

          {(isRemote || (isRemote === false && (includesHotel === true || includesHotel === false))) && (
            <SubmitContainer>
              <span className="header">
                Fechado! O total ficou em <strong>R$ {typePrice + hotelPrice}</strong>. Agora é só confirmar:
              </span>
              <button className="submit" onClick={() => handleSubmit()}>
                RESERVAR INGRESSO
              </button>
            </SubmitContainer>
          )}
        </>
      )}
    </Container>
  );
}

const Container = styled.div`
  height: 100%;
  width: 100%;
  font-family: 'Roboto', sans-serif;
  display: flex;
  flex-direction: column;
  align-items: ${(props) => (!props.enrollment ? 'center' : 'inherit')};
  justify-content: ${(props) => (!props.enrollment ? 'center' : 'inherit')};

  position: relative;
`;

const Header = styled.span`
  height: 40px;
  font-size: 34px;
  font-weight: 400;
  line-height: 39.84px;
  position: absolute;
  top: 0;
  left: 0;
`;

const NoEnrollment = styled.span`
  width: 400px;
  font-size: 20px;
  text-align: center;
  color: #8e8e8e;
`;

const TypesContainer = styled.div`
  height: 189px;
  margin-top: 57px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  .header {
    font-size: 20px;
    line-height: 23.44px;
    color: #8e8e8e;
  }

  .types {
    height: 145px;
    width: 314px;
    display: flex;
    justify-content: space-between;
  }
`;

const HotelsContainer = styled.div`
  height: 189px;
  margin-top: 34px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  .header {
    font-size: 20px;
    line-height: 23.44px;
    color: #8e8e8e;
  }

  .hotels {
    height: 145px;
    width: 314px;
    display: flex;
    justify-content: space-between;
  }
`;

const Type = styled.div`
  height: 144px;
  width: 144px;
  border: 1px solid #cecece;
  border-radius: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  cursor: pointer;

  background-color: ${(props) => props.isRemote === props.remote && '#FFEED2'};

  .name {
    line-height: 18.75px;
    font-size: 16px;
    color: #454545;
  }

  .price {
    color: #898989;
    line-height: 16.41px;
    font-size: 14px;
  }
`;

const Hotel = styled.div`
  height: 144px;
  width: 144px;
  border: 1px solid #cecece;
  border-radius: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  cursor: pointer;

  background-color: ${(props) => props.includesHotel === props.hotel && '#FFEED2'};

  .name {
    line-height: 18.75px;
    font-size: 16px;
    color: #454545;
  }

  .price {
    color: #898989;
    line-height: 16.41px;
    font-size: 14px;
  }
`;

const SubmitContainer = styled.div`
  height: 77px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  margin-top: 43px;

  .header {
    font-size: 20px;
    line-height: 23.44px;
    color: #8e8e8e;
  }

  .submit {
    height: 37px;
    width: 166px;
    font-size: 14px;
    text-align: center;
    background-color: #e0e0e0;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    box-shadow: 0px 2px 10px 0px #00000040;
  }
`;
