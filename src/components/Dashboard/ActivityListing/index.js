import { useEffect, useState } from 'react';
import styled from 'styled-components';
import useActivity from '../../../hooks/api/useActivity';
import DateButton from './DateButton.js';

/* eslint-disable */ /////////////////////////////////////////////////////////

const weekDays = [
  'Domingo',
  'Segunda',
  'Terça',
  'Quarta',
  'Quinta',
  'Sexta',
  'Sábado',
]

export default function ActivityListing() {
  const {
    activities,
    activitiesError,
    activityiesLoading,
    getActivities
  } = useActivity();

  const [dates, setDates] = useState([]);
  const [selectedDate, setSelectedDate] = useState('');

  useEffect(() => {
    if (activities) {
      const dates = [];
      console.log(activities);
      for (const i of activities) {
        const weekDay = weekDays[new Date(i.startAt).getDay()];
        const day = i.startAt.substring(5, 10).split('-').reverse().join('/');
        i.dayMonth = day;
        const dayWithWeekDay = `${weekDay}, ${day}`;
        if (!dates.includes(dayWithWeekDay)) dates.push(dayWithWeekDay);
      }
      setDates(dates);
    }
  }, [activities]);

  function dateClickHandler(date) {
    setSelectedDate(date);
    console.log(date);
  }

  return (
    <PageContainer>
      <h2>Primeiro, filtre pelo dia do evento:</h2>
      <DatesContainer>
        {dates ? dates.map(e => <DateButton key={e} date={e} isSelected={selectedDate === e} clickHandler={dateClickHandler} />)
          : null}
      </DatesContainer>
    </PageContainer>
  );
}

const DatesContainer = styled.div`
  display: flex;
  gap: 30px;
  padding-bottom: 5px;
  flex-wrap: wrap;
`;

const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  font-family: 'Roboto', 'Helvetica', 'Arial', sans-serif;
  gap: 18px;

  h2 {
    font-size: 20px;
    font-weight: 400;
    line-height: 23px;
    letter-spacing: 0em;
    text-align: left;
    color: #8e8e8e;
  }

  ul {
    width: 100%;
    overflow-x: scroll;
    scroll-behavior: smooth;
    display: flex;
    gap: 19px;
    ::-webkit-scrollbar {
      height: 8px;
      width: 8px;
    }
    ::-webkit-scrollbar-thumb {
      background-color: #c9c6c6;
      border-radius: 4px;
    }
  }
`;
