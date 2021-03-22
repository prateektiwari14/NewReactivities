import React, { ChangeEvent, useState } from 'react';
import { Button, Form, Segment } from 'semantic-ui-react';
import { Activity } from '../../../app/models/activity';

interface Props
{
    activity: Activity | undefined;
    closeForm:()=>void;
    CreateOrEdit:(activity:Activity) => void;
}

export default function ActivityForm({activity: selectActivity,closeForm, CreateOrEdit}: Props)
{
const initialState = selectActivity ?? {
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
    console.log(activity);
    CreateOrEdit(activity);
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
                <Form.Input placeholder='Date' name='date' value={activity.date} onChange={onChangeActivity}/>
                <Form.Input placeholder='City' name='city' value={activity.city} onChange={onChangeActivity}/>
                <Form.Input placeholder='Venue' name='venue' value={activity.venue} onChange={onChangeActivity}/>
                <Button floated='right' positive color='blue' type='submit' content='Submit' />
                <Button onClick={closeForm} floated='right' color='grey' type='button' content='Cancel' />
            </Form>
        </Segment>
    )
}