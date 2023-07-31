import useAsync from '../useAsync';

import * as eventApi from '../../services/eventApi';

export default function useEvent() {
  const {
    data: event,
    loading: eventLoading,
    error: eventError,
  } = useAsync(eventApi.getEventInfo);

  return {
    event,
    eventLoading,
    eventError,
  };
}
