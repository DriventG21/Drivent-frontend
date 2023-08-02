import useAsync from '../useAsync';
import useToken from '../useToken';

import * as hotelApi from '../../services/hotelApi';

export default function useRoom() {
  const token = useToken();

  const {
    data: rooms,
    loading: roomsLoading,
    error: roomsError,
    act: getRooms,
  } = useAsync((id) => hotelApi.getHotelRooms(token, id));

  return {
    rooms,
    roomsLoading,
    roomsError,
    getRooms,
  };
}
