import React from 'react';
import { Grid } from 'semantic-ui-react';
import ActivityDetails from '../details/ActivityDetails';
import ActivityForm from '../forms/ActivityForm';
import ActivityList from './ActivityList';
import { UseStore } from "../../../app/stores/stores";
import { observer } from 'mobx-react-lite';

export default observer(function ActivityDashboard()
{
    const {activityStore}=UseStore();
    const{selectedActivity,editMode}=activityStore;
    
    return(
        <Grid>
            <Grid.Column width='10'>
            <ActivityList />
            </Grid.Column>
            <Grid.Column width='6'>
                {selectedActivity && !editMode &&
                <ActivityDetails />}
                {editMode &&    
                <ActivityForm />}
            </Grid.Column>
        </Grid>
    )
})