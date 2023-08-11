import useAsync from "../useAsync.js";
import useToken from "../useToken.js";

import * as ticketApi from "../../services/ticketApi.js";

export default function useTicket() {
  const token = useToken();

  const {
    data: ticket,
    loading: ticketLoading,
    error: ticketError,
    act: getTicket
  } = useAsync(() => ticketApi.getTicket(token));

  return {
    ticket,
    ticketLoading,
    ticketError,
    getTicket
  };
}