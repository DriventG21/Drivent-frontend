import useAsync from '../useAsync';

import * as cepApi from '../../services/cepApi';

export default function useCep() {
  const {
    data: cep,
    loading: cepLoading,
    error: cepError,
    act: getCep,
  } = useAsync(cepApi.getAddress, false);

  return {
    cep,
    cepLoading,
    cepError,
    getCep,
  };
}
