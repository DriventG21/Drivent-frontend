import styled from 'styled-components';
import Typography from '@material-ui/core/Typography';
import Cards from 'elt-react-credit-cards';
import 'elt-react-credit-cards/es/styles-compiled.css';
import { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useEffect } from 'react';

export default function PaymentInfo({ 
  isRemote, 
  includesHotel, 
  typePrice, 
  hotelPrice, 
  config
}) {
  const [number, setNumber] = useState('');
  const [name, setName] = useState('');
  const [expiry, setExpiry] = useState('');
  const [cvc, setCvc] = useState('');
  const [focused, setFocused] = useState('');

  const [ticketId, setTicketId] = useState();

  const [controlPage, setControlPage] = useState(0);

  useEffect(() => findTicket());

  const handleCardNumber = (e) => {
    const inputValue = e.target.value;
    const numericValue = inputValue.replace(/\D/g, '');
    const formattedValue = numericValue.match(/.{1,4}/g)?.join(' ') || '';
    setNumber(formattedValue.substr(0, 19));
  };

  const handleNameChange = (e) => {
    const inputValue = e.target.value;
    const truncatedValue = inputValue.slice(0, 30);
    setName(truncatedValue);
  };

  const handleExpiryChange = (e) => {
    const inputValue = e.target.value;
    const numericValue = inputValue.replace(/\D/g, '');
    const cursorPosition = e.target.selectionStart;
    if (cursorPosition > 0 && inputValue[cursorPosition] === '/') {
      setExpiry(numericValue.slice(0, cursorPosition - 1) + numericValue.slice(cursorPosition));
    } else {
      if (numericValue.length > 2) {
        const formattedValue = `${numericValue.slice(0, 2)}/${numericValue.slice(2, 4)}`;
        setExpiry(formattedValue);
      } else {
        setExpiry(numericValue);
      }
    }
  };

  const handleCvcChange = (e) => {
    const inputValue = e.target.value;
    const numericValue = inputValue.replace(/\D/g, '');
    const truncatedValue = numericValue.slice(0, 3);
    setCvc(truncatedValue);
  };

  function findTicket() {
    axios.get(`${process.env.REACT_APP_API_BASE_URL}/tickets`, config).then((res) => setTicketId(res.data.id));
  }

  const cardData = {
    issuer: number.charAt(0) === '4' ? 'VISA' : number.charAt(0) === '5' ? 'MASTERCARD' : '',
    number,
    name,
    expirationDate: expiry,
    cvv: cvc
  };

  const body = {
    cardData,
    ticketId
  };

  function finishPayment() {
    axios
      .post(`${process.env.REACT_APP_API_BASE_URL}/payments/process`, body, config)
      .then((res) => {
        toast('Pagamento realizado com sucesso!');
        setControlPage(1);
      })
      .catch((err) => {
        toast('Não foi possível realizar o pagamento!');
      });
  }
  
  return (
    <>
      <StyledTypography variant="h4">Ingresso e Pagamento</StyledTypography>
      <StyledSubTitle>Ingresso Escolhido</StyledSubTitle>
      <TicketTypeContainer>
        <TicketText>{isRemote ? 'Online' : 'Presencial'} {includesHotel ? 'com hotel' : 'sem Hotel'}</TicketText>
        <TicketPrice>R$ {typePrice + hotelPrice}</TicketPrice>
      </TicketTypeContainer>
      <StyledSubTitle>Pagamento</StyledSubTitle>
      {controlPage === 0 ? (
        <>
          <CardContainer>
            <Cards
              number={number}
              name={name}
              expiry={expiry}
              cvc={cvc}
              focused={focused}
            ></Cards>
            <form>
              <input
                type='tel'
                name='number'
                placeholder='Número do cartão'
                value={number}
                onChange={handleCardNumber}
                onFocus={e => setFocused(e.target.name)}
                inputMode='numeric'
                className='number'
              />
              <h5>Exemplo: 9999 9999 9999 9999</h5>
              <input
                type='text'
                name='name'
                placeholder='Nome'
                value={name}
                onChange={handleNameChange}
                onFocus={e => setFocused(e.target.name)}
                className='name'
              />
              <div>
                <input
                  type='text'
                  name='expiry'
                  placeholder='Data de validade'
                  value={expiry}
                  onChange={handleExpiryChange}
                  onFocus={e => setFocused(e.target.name)}
                  className='expiry'
                />
                <input
                  type='tel'
                  name='cvc'
                  placeholder='CVC'
                  value={cvc}
                  onChange={handleCvcChange}
                  onFocus={e => setFocused(e.target.name)}
                  className='cvc'
                />
              </div>
        
            </form>
          </CardContainer>
          <SubmitButton onClick={finishPayment}>FINALIZAR PAGAMENTO</SubmitButton>
        </>
      ) : (
        <ConfirmationContainer>
          <ion-icon name="checkmark-circle"></ion-icon>
          <div>
            <h5>Pagamento confirmado!</h5>
            <h6>Prossiga para escolha de hospedagem e atividades</h6>
          </div>
        </ConfirmationContainer>)}
      
    </>
  );
}

const StyledTypography = styled(Typography)`
margin-bottom: 20px!important;
`;

const StyledSubTitle = styled.h5`
font-family: 'Roboto', sans-serif;
font-size: 20px;
font-weight: 400;
line-height: 23px;
letter-spacing: 0em;
text-align: left;
color: #8E8E8E;
`;

const TicketTypeContainer = styled.div`
width: 300px;
height: 108px;
border-radius: 20px;
background-color: #FFEED2;
margin-top: 20px;
margin-bottom: 20px;
display: flex;
align-items: center;
justify-content: center;
flex-direction: column;
`;

const TicketText = styled.h6`
font-family: 'Roboto', sans-serif;
font-size: 16px;
font-weight: 400;
line-height: 19px;
letter-spacing: 0em;
text-align: center;
color: #454545;
`;

const TicketPrice = styled.h6`
font-family: 'Roboto', sans-serif;
font-size: 14px;
font-weight: 400;
line-height: 16px;
letter-spacing: 0em;
text-align: center;
color: #898989;
margin-top: 5px;
`;

const CardContainer = styled.div`
margin-top: 20px;
display: flex;
width: 654px;

form{
    display: flex;
    flex-direction: column;
    margin-left: 50px;
    h5{
        font-size: 18px;
        color: #8E8E8E;
        margin-top: -8px;
        margin-bottom: 38px;
    }
    div{
        display: flex;
        justify-content: space-between;
    }
    input{
        height: 35px;
        font-size: 20px;
        text-align: left;
        border-width: 1px;
        border-radius: 4px;
        padding-left: 5px;
    }
    .number, .name{
        width: 100%;
        margin-bottom: 15px;
    }
    .expiry{
        width: 220px;
    }
    .cvc{
        width: 70px;
    }
}

@media (max-width: 600px) {
    display: flex;
    flex-direction: column;
    width: auto;
    form{
        margin-top: 20px;
        margin-left: 0px;
    }
}
`;

const SubmitButton = styled.button`
margin-top: 25px;
height: 37px;
width: 166px;
font-size: 14px;
text-align: center;
background-color: #e0e0e0;
border: none;
border-radius: 4px;
cursor: pointer;
box-shadow: 0px 2px 10px 0px #00000040;
`;

const ConfirmationContainer = styled.div`
display: flex;
margin-top: 10px;
ion-icon{
  color: #36B853;
  font-size: 60px;
}

div{
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-left: 20px;
  font-size: 18.75px;
  color: #454545;
  h5{
    font-weight: 700;
    margin-bottom: 5px;
  }
  h6{
    font-weight: 400;
  }
}
`;
