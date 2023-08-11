import useAsync from '../useAsync.js';
import useToken from '../useToken.js';

import * as activityApi from '../../services/activityApi';

export default function useActivity() {
  const token = useToken();

  const {
    data: activities,
    loading: activitiesLoading,
    error: activitiesError,
    act: getActivities
  } = useAsync(() => activityApi.getActivities(token));

  return {
    activities,
    activitiesLoading,
    activitiesError,
    getActivities
  };
}
