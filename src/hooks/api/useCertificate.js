import useAsync from '../useAsync';
import useToken from '../useToken';

import * as certificateApi from '../../services/certificateApi';

export default function useCertificate() {
  const token = useToken();
  const {
    data: certificateValidation,
    loading: certificateLoading,
    error: certificateError,
    act: getCertificate,
  } = useAsync(() => certificateApi.check(token));

  return {
    certificateValidation,
    certificateLoading,
    certificateError,
    getCertificate,
  };
}
