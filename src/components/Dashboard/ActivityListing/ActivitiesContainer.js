import styled from 'styled-components';
import ActivityCard from './ActivityCard.js';
import { useEffect, useState } from 'react';

/* eslint-disable */ /////////////////////////////////////////////

export default function ActivitiesContainer({ activities }) {
    const [userTicket, setUserTicket] = useState({});

    // useEffect(()=>{
    //     ticket?
    // }, [])

    return (
        <MyContainer>
            <div>
                <h3>Auditório Principal</h3>
                <div>
                    {activities.filter(e => e.local === 'MAIN').map(activity => <ActivityCard key={activity} activity={activity} />)}
                </div>
            </div>
            <div>
                <h3>Auditório Lateral</h3>
                <div>
                    {activities.filter(e => e.local === 'SIDE').map(activity => <ActivityCard key={activity} activity={activity} />)}
                </div>
            </div>
            <div>
                <h3>Sala de Workshop</h3>
                <div>
                    {activities.filter(e => e.local === 'WORKSHOP').map(activity => <ActivityCard key={activity} activity={activity} />)}
                </div>
            </div>
        </MyContainer>
    )
}

const MyContainer = styled.div`
    display: flex;
    justify-content: space-between;
    height: 100%;

    >div{
        width: 100%;
        height: 100%;
        
        >div{
            display: flex;
            flex-direction: column;
            box-sizing: border-box;
            border: 1px solid #D7D7D7;
            gap: 10px;
            width: 100%;
            height: 100%;
            padding: 10px;
        }
    }

    h3{
        color: #7B7B7B;
        text-align: center;
        font-family: Roboto;
        font-size: 17px;
        margin-bottom: 10px;
    }
`;