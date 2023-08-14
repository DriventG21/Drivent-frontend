import styled from 'styled-components';
import ActivityCard from './ActivityCard.js';
import { useEffect } from 'react';
import { toast } from 'react-toastify';
import useRegisterInActivity from '../../../hooks/api/usePostActivity.js';
import httpstatus from 'http-status';

export default function ActivitiesContainer({ activities, activitiesLoading, getActivities }) {
  const { postActivityLoading, postActivityError, postRegisterInActivity } = useRegisterInActivity();

  useEffect(() => {
    if (postActivityError) {
      if (postActivityError.response.date) toast(postActivityError.response.data);
      else toast(httpstatus[postActivityError.response.status]);
    }
  }, [postActivityError]);

  async function registerInActivity(id) {
    if (!(postActivityLoading || activitiesLoading)) {
      const selectedActivity = activities.find(e => e.id === id);
      if (isUserTimeFree(selectedActivity)) toast('Inscrito em outra atividade neste horario');
      else {
        await postRegisterInActivity({ activityId: id });
        await getActivities();
      }
    }
  }

  function isUserTimeFree(selectedActivity) {
    return activities.filter(e => e.userIsRegistered === true).some(e =>
      (selectedActivity.startAtDateTime >= e.startAtDateTime && selectedActivity.startAtDateTime < e.endAtDateTime)
      || (selectedActivity.endAtDateTime >= e.startAtDateTime && selectedActivity.endAtDateTime < e.endAtDateTime));
  }

  return (
    <MyContainer>
      <div>
        <h3>Auditório Principal</h3>
        <div>
          {activities.filter(e => e.local === 'MAIN').map(activity => <ActivityCard key={activity.userIsRegistered ? activity.id : activity.id * -1} activity={activity} registerInActivity={registerInActivity} />)}
        </div>
      </div>
      <div>
        <h3>Auditório Lateral</h3>
        <div>
          {activities.filter(e => e.local === 'SIDE').map(activity => <ActivityCard key={activity.userIsRegistered ? activity.id : activity.id * -1} activity={activity} registerInActivity={registerInActivity} />)}
        </div>
      </div>
      <div>
        <h3>Sala de Workshop</h3>
        <div>
          {activities.filter(e => e.local === 'WORKSHOP').map(activity => <ActivityCard key={activity.userIsRegistered ? activity.id : activity.id * -1} activity={activity} registerInActivity={registerInActivity} />)}
        </div>
      </div>
    </MyContainer>
  );
}

const MyContainer = styled.div`
  display: flex;
  justify-content: space-between;
  height: 100%;

  >div{
    display: flex;
    flex-direction: column;
    gap: 10px;
    width: 100%;
    height: 100%;
    
    >h3{
      color: #7B7B7B;
      text-align: center;
      font-family: Roboto;
      font-size: 18px;
    }

    >div{
      display: flex;
      flex-direction: column;
      gap: 10px;
      border: 1px solid #D7D7D7;
      width: 100%;
      height: 100%;
      padding: 10px;
    }
  }
`;
