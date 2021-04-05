import React, { useEffect } from "react";
import { Container } from "semantic-ui-react";
import NavBar from "./NavBar";
import ActivityDashboard from "../../features/activities/dashboard/ActivityDashboard";
import LoadingComponent from "./LoadingComponent";
import { UseStore } from "../stores/stores";
import { observer } from "mobx-react-lite";

function App() {
  const {activityStore} = UseStore();

  // useEffect(() => {
  //   axios.get<Activity[]>("http://localhost:5000/api/activities").then((response) => {
  //     setActivities(response.data);
  //   });
  // }, []);

  useEffect(() =>{
   activityStore.loadActivities();
  },[activityStore]);

  // function HandleSelectActivity(id:string)
  // {
  //   setSelectedActivity(activities.find(x=>x.id === id));
  // }

  // function HandleCancelActivity()
  // {
  //   setSelectedActivity(undefined);
  // }

  // function HandleFormOpen(id?:string)
  // {
  //   id ? HandleSelectActivity(id) : HandleCancelActivity();
  //   setEditMode(true);
  // }

  // function HandleFormClose()
  // {
  //   setEditMode(false);
  // }

  // function HandleCreateOrEditActivity(activity:Activity)
  // {
  //   setSubmitting(true);
  //   if (activity.id) {
  //     agent.Activities.update(activity).then(()=> {
  //     setActivities([...activities.filter(x=>x.id !== activity.id), activity])
  //     setEditMode(false);
  //     setSelectedActivity(activity);
  //     setSubmitting(false);
  //     })  
  //   }
  //   else
  //   {
  //     activity.id=uuid();
  //     agent.Activities.create(activity).then(()=>{
  //       setActivities([...activities, activity]);
  //     setEditMode(false);
  //     setSelectedActivity(activity);
  //     setSubmitting(false);
  //     })  
  //   }
  //   // activity.id ? setActivities([...activities.filter(x=>x.id !== activity.id), activity])
  //   // : setActivities([...activities, {...activity, id:uuid()}]);
  // }

  // function HandleDeleteActivity(id:string)
  // {
  //   setSubmitting(true);
  //   agent.Activities.delete(id).then(()=>{
  //     setActivities([...activities.filter(x=>x.id !== id)]);
  //   })
  //   setSubmitting(false);
  //   //setActivities([...activities.filter(x=>x.id !== id)]);
  // }

  if (activityStore.loadingInitial) {
    return <LoadingComponent content='Loading App....' />
  }

  return (
    <>
      <NavBar />
      <Container style={{marginTop:'7em'}}>
     <ActivityDashboard />
      </Container>
    </>
  );
}

export default observer(App);