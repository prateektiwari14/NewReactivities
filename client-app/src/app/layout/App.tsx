import React, { useEffect, useState } from "react";
import { Container } from "semantic-ui-react";
import { Activity } from "../models/activity";
import NavBar from "./NavBar";
import ActivityDashboard from "../../features/activities/dashboard/ActivityDashboard";
import {v4 as uuid} from 'uuid';
import agent from "../api/agent";
import LoadingComponent from "./LoadingComponent";

function App() {
  const [activities, setActivities] = useState<Activity[]>([]);
  const [selectedActivity, setSelectedActivity] = useState<Activity | undefined>(undefined);
  const [editMode, setEditMode] = useState(false);
  const [loading,setloading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  // useEffect(() => {
  //   axios.get<Activity[]>("http://localhost:5000/api/activities").then((response) => {
  //     setActivities(response.data);
  //   });
  // }, []);

  useEffect(() =>{
    agent.Activities.list().then(response =>{
      let activities:Activity[] = []
      response.forEach(activity =>{
        activity.date=activity.date.split('T')[0];
        activities.push(activity)
      })
      setActivities(activities);
      setloading(false);
    })
  },[]);

  function HandleSelectActivity(id:string)
  {
    setSelectedActivity(activities.find(x=>x.id === id));
  }

  function HandleCancelActivity()
  {
    setSelectedActivity(undefined);
  }

  function HandleFormOpen(id?:string)
  {
    id ? HandleSelectActivity(id) : HandleCancelActivity();
    setEditMode(true);
  }

  function HandleFormClose()
  {
    setEditMode(false);
  }

  function HandleCreateOrEditActivity(activity:Activity)
  {
    setSubmitting(true);
    if (activity.id) {
      agent.Activities.update(activity).then(()=> {
      setActivities([...activities.filter(x=>x.id !== activity.id), activity])
      setEditMode(false);
      setSelectedActivity(activity);
      setSubmitting(false);
      })  
    }
    else
    {
      activity.id=uuid();
      agent.Activities.create(activity).then(()=>{
        setActivities([...activities, activity]);
      setEditMode(false);
      setSelectedActivity(activity);
      setSubmitting(false);
      })  
    }
    // activity.id ? setActivities([...activities.filter(x=>x.id !== activity.id), activity])
    // : setActivities([...activities, {...activity, id:uuid()}]);
  }

  function HandleDeleteActivity(id:string)
  {
    setSubmitting(true);
    agent.Activities.delete(id).then(()=>{
      setActivities([...activities.filter(x=>x.id !== id)]);
    })
    setSubmitting(false);
    //setActivities([...activities.filter(x=>x.id !== id)]);
  }

  if (loading) {
    return <LoadingComponent content='Loading App....' />
  }

  return (
    <>
      <NavBar openForm={HandleFormOpen} />
      <Container style={{marginTop:'7em'}}>
     <ActivityDashboard activities={activities} 
        selectedActivity={selectedActivity} 
        selectActivity={HandleSelectActivity}
        cancelActivity={HandleCancelActivity}
        editMode = {editMode}
        openForm = {HandleFormOpen}
        closeForm = {HandleFormClose}
        CreateOrEdit={HandleCreateOrEditActivity}
        DeleteActivity={HandleDeleteActivity}
        submitting={submitting}
        />
      </Container>
    </>
  );
}

export default App;