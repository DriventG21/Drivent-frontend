import useAsync from '../useAsync.js';
import useToken from '../useToken.js';

import * as activityApi from '../../services/activityApi';

export default function useRegisterInActivity() {
  const token = useToken();

  const {
    data: postedActivity,
    loading: postActivityLoading,
    error: postActivityError,
    act: postRegisterInActivity
  } = useAsync((data) => activityApi.postRegisterInActivity(data, token), false);

  return {
    postedActivity,
    postActivityLoading,
    postActivityError,
    postRegisterInActivity
  };
}
