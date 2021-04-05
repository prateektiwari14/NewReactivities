import { observer } from 'mobx-react-lite';
import React, { ChangeEvent, useState } from 'react';
import { Button, Form, Segment } from 'semantic-ui-react';
import { UseStore } from '../../../app/stores/stores';


export default observer( function ActivityForm()
{

const {activityStore}=UseStore();
const{selectedActivity,closeForm,CreateActivity,UpdateActivity,loading} = activityStore;    
const initialState = selectedActivity ?? {
    id:'',
    title:'',
    category:'',
    description:'',
    date:'',
    city:'',
    venue:'',
}

const[activity,setActivity]=useState(initialState);

function HandleSubmit()
{
    activity.id?UpdateActivity(activity):CreateActivity(activity);
}

function onChangeActivity(event:ChangeEvent<HTMLInputElement | HTMLTextAreaElement>)
{
    const{name,value} = event.target;
    setActivity({...activity,[name]:value});
}

    return(
        <Segment clearing>
            <Form onSubmit={HandleSubmit}  autoComplete='off'>
                <Form.Input placeholder='Title'  name='title' value={activity.title} onChange={onChangeActivity} />
                <Form.TextArea placeholder='Description' name='description' value={activity.description} onChange={onChangeActivity} />
                <Form.Input placeholder='Category' name='category' value={activity.category} onChange={onChangeActivity} />
                <Form.Input placeholder='Date' type='date' name='date' value={activity.date} onChange={onChangeActivity}/>
                <Form.Input placeholder='City' name='city' value={activity.city} onChange={onChangeActivity}/>
                <Form.Input placeholder='Venue' name='venue' value={activity.venue} onChange={onChangeActivity}/>
                <Button floated='right' loading={loading} positive color='blue' type='submit' content='Submit' />
                <Button onClick={closeForm} floated='right' color='grey' type='button' content='Cancel' />
            </Form>
        </Segment>
    )
})