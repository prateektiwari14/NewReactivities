import React from 'react';
import { Grid } from 'semantic-ui-react';
import { Activity } from '../../../app/models/activity';
import ActivityDetails from '../details/ActivityDetails';
import ActivityForm from '../forms/ActivityForm';
import ActivityList from './ActivityList';

interface Props
{
    activities:Activity[];
    selectedActivity:Activity | undefined;
    selectActivity: (id:string) =>void;
    cancelActivity:()=> void;
    editMode: boolean;
    openForm: (id:string) => void;
    closeForm:() => void;
    CreateOrEdit:(activity:Activity) => void;
    DeleteActivity:(id:string) => void;
    submitting: boolean;
}

export default function ActivityDashboard({activities, selectedActivity, selectActivity, cancelActivity,
     DeleteActivity, editMode, openForm, closeForm, CreateOrEdit, submitting}: Props)
{
    return(
        <Grid>
            <Grid.Column width='10'>
            <ActivityList activities={activities} selectActivity={selectActivity} DeleteActivity={DeleteActivity} submitting={submitting}/>
            </Grid.Column>
            <Grid.Column width='6'>
                {selectedActivity && !editMode &&
                <ActivityDetails activity={selectedActivity} cancelActivity={cancelActivity} openForm={openForm} />}
                {editMode &&    
                <ActivityForm  activity={selectedActivity} closeForm={closeForm} CreateOrEdit={CreateOrEdit} submitting={submitting}/>}
            </Grid.Column>
        </Grid>
    )
}