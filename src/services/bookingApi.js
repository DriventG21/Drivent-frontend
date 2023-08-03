import api from './api';

export async function bookRoomById(token, roomId) {
  const body = { roomId: roomId };
  const res = await api.post('/booking', body, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return res.data;
}

export async function getBooking(token) {
  const res = await api.get('/booking', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return res.data;  
}

export async function updateRoomById(token, roomId, bookingId) {
  const body = { roomId: roomId };
  const res = await api.put(`/booking/${bookingId}`, body, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return res.data;
}
