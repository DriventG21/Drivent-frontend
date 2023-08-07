import useAsync from '../useAsync';
import useToken from '../useToken';

import * as bookingApi from '../../services/bookingApi';

export function useBooking() {
  const token = useToken();
  
  const {
    data: booking,
    loading: bookingLoading,
    error: bookingError,
    act: getBooking
  } = useAsync(() => bookingApi.getBooking(token));

  return {
    booking,
    bookingLoading,
    bookingError,
    getBooking
  };
}
