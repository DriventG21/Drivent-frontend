import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { CgEnter } from 'react-icons/cg';
import { AiOutlineCloseCircle, AiOutlineCheckCircle } from 'react-icons/ai';

/* eslint-disable */ ///////////////////////////////////////

export default function ActivityCard({ activity: realActivity, registerInActivity }) {
  const [height, setHeight] = useState(0);
  const [activity, setActivity] = useState({ ...realActivity }) ////////////////

  useEffect(() => {
    if (activity.id === 2) setActivity({ ...activity, userIsRegistered: true }); /////////////
    else setActivity({ ...activity, userIsRegistered: false });///////////////

    const startAtHour = activity.startAt.substring(11, 13);
    const endAtHour = activity.endAt.substring(11, 13);
    setHeight(`${(endAtHour - startAtHour - 1) * 80}px`);
  }, [realActivity]); ///////////////////////////////

  return (
    <MyCard myHeight={height} myBackgroud={activity.userIsRegistered ? '#D0FFDB' : '#F1F1F1'} >
      <InfoContainer>
        <p>{activity.name}</p>
        <span>{activity.startAt.substring(11, 16)} - {activity.endAt.substring(11, 16)}</span>
      </InfoContainer>
      <Bar myColor={activity.userIsRegistered ? '#99E8A1' : '#CFCFCF'} />
      {activity.userIsRegistered ?
        <IconContainer myColor='#078632' >
          <AiOutlineCheckCircle />
          <span>Inscrito</span>
        </IconContainer>
        :
        activity.vacancy > 0 ?
          <IconContainer myColor='#078632' >
            <CgEnter onClick={() => registerInActivity(activity.id)} />
            <span>{activity.vacancy} Vagas</span>
          </IconContainer>
          :
          <IconContainer myColor='#CC6666' >
            <AiOutlineCloseCircle />
            <span>Esgotado</span>
          </IconContainer>
      }
    </MyCard>
  )
}

const InfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  gap: 8px;

  p{
    color: #343434;
    font-family: Roboto;
    font-size: 18px;
    font-weight: 600;
  }

  span{
    color: #343434;
    font-family: Roboto;
    font-size: 16px;
    font-weight: 400;
  }
`;

const Bar = styled.span`
  height: 100%;
  width: 1px;
  background: ${props => props.myColor};
`;

const IconContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 5px;

  span{
    color: ${props => props.myColor};
    font-family: Roboto;
    font-size: 15px;
    font-weight: 400;
  }

  svg{
    font-size: 30px;
    color: ${props => props.myColor};
    cursor: pointer;
  }
`;

const MyCard = styled.div`
  display: flex;
  height: ${props => props.myHeight};
  width: 100%;
  align-items: center;
  justify-content: space-between;
  border-radius: 5px;
  background: ${props => props.myBackgroud};
  padding: 10px;
`;