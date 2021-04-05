import { Activity } from "../models/activity";
import { makeAutoObservable, runInAction } from "mobx";
import agent from "../api/agent";
import{v4 as uuid} from 'uuid';

export default class ActivityStore
{
    activityRegistry = new Map<string, Activity>();
    selectedActivity:Activity | undefined = undefined;
    editMode = false;
    loading = false;
    loadingInitial=true;

    constructor() {
        makeAutoObservable(this)
    }

    get getActivityByDate()
    {
        return Array.from(this.activityRegistry.values()).sort((a,b) =>Date.parse(a.date) - Date.parse(b.date));
    }

    loadActivities=async()=>{
        var activties = await agent.Activities.list();
        activties.forEach(activity =>{
            activity.date=activity.date.split('T')[0];
            this.activityRegistry.set(activity.id, activity)
          })

          this.setLoadingInitial(false)
    }

    setLoadingInitial=(state:boolean)=>{
        this.loadingInitial = state;
    }

    setEditMode=(state:boolean)=>{
        this.editMode = state;
    }

    SelectActivity=(id:string)=>{
        this.selectedActivity =this.activityRegistry.get(id);
    }

    CancelActivity = () => {
        this.selectedActivity = undefined;
    }

    openForm =(id?: string)=>{
        id?this.SelectActivity(id):this.CancelActivity();
        this.setEditMode(true);
    }

    closeForm=()=>{
        this.setEditMode(false);
    }

    CreateActivity= async(activity:Activity)=>{
       this.loading=true;
       activity.id=uuid();
       await agent.Activities.create(activity);
       runInAction(()=>{
        this.activityRegistry.set(activity.id,activity);
        this.selectedActivity=activity;
        this.setEditMode(false);
        this.loading=false;
       })     
    }

    UpdateActivity = async(activity:Activity)=>{
        this.loading=true;
        await agent.Activities.update(activity);
        runInAction(()=>{
            this.activityRegistry.set(activity.id,activity);
            this.selectedActivity=activity;
            this.setEditMode(false);
            this.loading=false;
        })
    }

    DeleteActivity = async(id:string)=>{
        this.loading=true;
        await agent.Activities.delete(id)
        runInAction(()=>{
            this.activityRegistry.delete(id);
            if(this.selectedActivity?.id===id) this.CancelActivity();
            this.loading=false;
        })
    }
}