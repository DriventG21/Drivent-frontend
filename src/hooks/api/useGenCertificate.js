import useAsync from '../useAsync';
import useToken from '../useToken';

import * as certificateApi from '../../services/certificateApi';

export default function useGenCertificate(immediate) {
  const token = useToken();
  const {
    data: certificate,
    loading: certificateLoading,
    error: certificateGenError,
    act: genCertificate,
  } = useAsync(() => certificateApi.generateCertificate(token), immediate);

  return {
    certificate,
    certificateLoading,
    certificateGenError,
    genCertificate,
  };
}
