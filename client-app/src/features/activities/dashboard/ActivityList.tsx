import { observer } from 'mobx-react-lite';
import React, { SyntheticEvent, useState } from 'react';
import { Button, Item, Label, Segment } from 'semantic-ui-react';
import { UseStore } from '../../../app/stores/stores';

export default observer(function ActivityList() 
{
    const [target,setTarget]=useState('');

    const {activityStore}= UseStore();

    const{DeleteActivity,loading,getActivityByDate}= activityStore;

    function HandleDeleteActivity(e:SyntheticEvent<HTMLButtonElement>, id:string)
    {
        setTarget(e.currentTarget.name);
        DeleteActivity(id);
    }    
    return(
        <Segment>
            <Item.Group divided>
                {getActivityByDate.map(activity => (
                    <Item key={activity.id}>
                        <Item.Content>
                            <Item.Header as='a'>{activity.title}</Item.Header>
                            <Item.Meta>{activity.date}</Item.Meta>
                            <Item.Description>
                                <div>{activity.description}</div>
                                <div>{activity.city}, {activity.venue}</div>
                            </Item.Description>
                            <Item.Extra>
                                <Button onClick={()=> activityStore.SelectActivity(activity.id)} floated='right' content='View' color='blue' />
                                <Button
                                name={activity.id} 
                                onClick={(e)=> HandleDeleteActivity(e,activity.id)}
                                loading={loading && target===activity.id} 
                                floated='right' content='Delete' color='red' />
                                <Label basic content={activity.category} />
                            </Item.Extra>
                        </Item.Content>
                    </Item>
                ))}
            </Item.Group>
        </Segment>
    )
})