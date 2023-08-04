import axios from 'axios';
import Tickets from '../../../layouts/Tickets';
import { useEffect, useState } from 'react';
import useToken from '../../../hooks/useToken';
import PaymentInfo from '../../../layouts/PaymentInfo';
import { toast } from 'react-toastify';

export default function Payment() {
  const [enrollment, setEnrollment] = useState();
  const [ticketTypes, setTicketTypes] = useState();
  const [isRemote, setIsRemote] = useState('');
  const [includesHotel, setIncludesHotel] = useState('');
  const [typePrice, setTypePrice] = useState(0);
  const [hotelPrice, setHotelPrice] = useState(0);
  const [controlPage, setControlPage] = useState(0);
  const token = useToken();
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  useEffect(() => {
    findEnrollment();
    findTicketTypes();
  }, []);

  function findEnrollment() {
    axios.get(`${process.env.REACT_APP_API_BASE_URL}/enrollments`, config).then((res) => setEnrollment(res.data));
  }

  function findTicketTypes() {
    axios.get(`${process.env.REACT_APP_API_BASE_URL}/tickets/types`, config).then((res) => setTicketTypes(res.data));
  }

  function handleSubmit() {
    let ticketTypeId;

    if (includesHotel === '') setIncludesHotel(false);

    ticketTypes?.forEach((type) => {
      if (type.isRemote === isRemote && type.includesHotel === includesHotel) ticketTypeId = type.id;
    });

    axios
      .post(`${process.env.REACT_APP_API_BASE_URL}/tickets`, { ticketTypeId }, config)
      .then((res) => {
        toast('Ingresso reservado com sucesso!');
        setControlPage(1);
      })
      .catch((err) => toast('Não foi possível reservar seu ingresso'));
  }

  if(controlPage === 0) {
    return <Tickets 
      enrollment={enrollment} 
      ticketTypes={ticketTypes} 
      config={config}
      isRemote={isRemote} 
      setIsRemote={setIsRemote}
      includesHotel={includesHotel} 
      setIncludesHotel={setIncludesHotel}
      typePrice={typePrice}
      setTypePrice={setTypePrice}
      hotelPrice={hotelPrice}
      setHotelPrice={setHotelPrice}
      handleSubmit={handleSubmit}
    />;
  }

  if(controlPage === 1) {
    return <PaymentInfo 
      isRemote={isRemote}
      includesHotel={includesHotel}
      typePrice={typePrice}
      hotelPrice={hotelPrice}
      config={config}
    />;
  }
}
