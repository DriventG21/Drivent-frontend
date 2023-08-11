import api from './api';

export async function check(token) {
  const response = await api.get('/certificate', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
}

export async function generateCertificate(token) {
  const response = await api.get('/certificate/generate', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
}
//
