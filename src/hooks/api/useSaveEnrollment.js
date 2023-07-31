import useAsync from '../useAsync';
import useToken from '../useToken';

import * as enrollmentApi from '../../services/enrollmentApi';

export default function useSaveEnrollment() {
  const token = useToken();

  const {
    loading: saveEnrollmentLoading,
    error: saveEnrollmentError,
    act: saveEnrollment
  } = useAsync((data) => enrollmentApi.save(data, token), false);

  return {
    saveEnrollmentLoading,
    saveEnrollmentError,
    saveEnrollment
  };
}
