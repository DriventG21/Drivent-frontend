import { useState } from 'react';
import dayjs from 'dayjs';
import useInterval from 'react-useinterval';
import styled from 'styled-components';

export default function Timer({ time, onZero = () => 0 }) {
  const [timeRemaining, setTimeRemaining] = useState(diffToDate(time));

  useInterval(() => {
    if (timeRemaining) {
      let { days, hours, minutes, seconds } = timeRemaining;

      seconds--;
      if (seconds < 0) {
        minutes--;
        seconds = 59;
      }
      if (minutes < 0) {
        hours--;
        minutes = 59;
      }
      if (hours < 0) {
        days--;
        hours = 23;
      }

      if (!(days === 0 && hours === 0 && minutes === 0 && seconds === 0)) {
        setTimeRemaining({ days, hours, minutes, seconds });
      } else {
        onZero();
      }
    }
  }, 1000);

  return (
    <Grid>
      <CountdownBlock>
        {timeRemaining.days.toString().padStart(2, '0')}
        <Label>dias</Label>
      </CountdownBlock>
      <Divider>:</Divider>
      <CountdownBlock>
        {timeRemaining.hours.toString().padStart(2, '0')}
        <Label>horas</Label>
      </CountdownBlock>
      <Divider>:</Divider>
      <CountdownBlock>
        {timeRemaining.minutes.toString().padStart(2, '0')}
        <Label>minutos</Label>
      </CountdownBlock>
      <Divider>:</Divider>
      <CountdownBlock>
        {timeRemaining.seconds.toString().padStart(2, '0')}
        <Label>segundos</Label>
      </CountdownBlock>
    </Grid>
  );
}

const Grid = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  & > *:not(:first-child) {
    margin-left: 10px;
  }

  @media (max-width: 600px) {
    flex-direction: column;
  }
`;

const CountdownBlock = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  background-image: linear-gradient(to bottom, rgba(255, 255, 255, .3), rgba(255, 255, 255, .2));
  color: #000;
  font-size: 24px;
  width: 110px;
  height: 110px;
  border-radius: 9px;
`;

const Label = styled.div`
  opacity: .8;
  font-size: .72em;
`;

const Divider = styled.div`
  font-size: 24px;
`;

function diffToDate(date) {
  const now = dayjs();
  let to = dayjs(date);

  const days = to.diff(now, 'days');
  to = to.add(-days, 'days');

  const hours = to.diff(now, 'hours');
  to = to.add(-hours, 'hours');

  const minutes = to.diff(now, 'minutes');
  to = to.add(-minutes, 'minutes');

  const seconds = to.diff(now, 'seconds');

  return {
    days,
    hours,
    minutes,
    seconds
  };
}
