import axios from 'axios';
import Tickets from '../../../layouts/Tickets';
import { useEffect, useState } from 'react';
import useToken from '../../../hooks/useToken';

export default function Payment() {
  const [enrollment, setEnrollment] = useState();
  const [ticketTypes, setTicketTypes] = useState();
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

  return <Tickets enrollment={enrollment} ticketTypes={ticketTypes} config={config} />;
}
