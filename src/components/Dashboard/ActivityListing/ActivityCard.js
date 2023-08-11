import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { CgEnter } from 'react-icons/cg';

/* eslint-disable */ ///////////////////////////////////////

export default function ActivityCard({ activity }) {
    const [height, setHeight] = useState(0);
    const [startTime, setStartTime] = useState('');
    const [endTime, setEndTime] = useState('');

    useEffect(() => {
        const startAtDate = new Date(activity.startAt);
        const endAtDate = new Date(activity.endAt);
        // const startAtHour = startAtDate.getHours();
        const startAtHour = activity.startAt.substring(11, 13);
        // const endAtHour = endAtDate.getHours();
        const endAtHour = activity.endAt.substring(11, 13);
        setHeight(`${(endAtHour - startAtHour) * 80}px`);
        console.log(`${(endAtHour - startAtHour) * 80}px`)
    }, [activity])

    return (
        <MyCard height={height} >
            <InfoContainer>
                <p>{activity.name}</p>
                <span>{activity.startAt.substring(11, 16)} - {activity.endAt.substring(11, 16)}</span>
            </InfoContainer>
            <Bar />
            <IconContainer>
                <CgEnter size={30} />
                <span>{activity.vacancy} Vagas</span>
            </IconContainer>
        </MyCard>
    )
}

const InfoContainer = styled.div`
    display: flex;
    flex-direction: column;
    /* width: calc(100% - 65px); */

    p{

    }

    span{

    }
`;

const Bar = styled.span`
    height: 100%;
    width: 1px;
    background: #CFCFCF;
`;

const IconContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;

    span{
        color: #078632;
        font-family: Roboto;
        font-size: 9px;
        font-style: normal;
        font-weight: 400;
        line-height: normal;
    }
`;

const MyCard = styled.div`
    display: flex;
    height: ${props => props.height};
    width: 100%;
    align-items: center;
    justify-content: space-between;
    border-radius: 5px;
    background: #F1F1F1;
    padding: 10px;
`;