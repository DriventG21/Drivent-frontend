import dayjs from 'dayjs';

export default function useIsDateAfter(date) {
  const countdownDate = dayjs(date);
  const now = dayjs();

  const isAfter = now.isAfter(countdownDate);

  return isAfter;
}
