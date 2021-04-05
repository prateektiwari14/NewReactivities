import { createContext, useContext } from "react";
import ActivityStore from "./ActivityStore";

interface Store
{
    activityStore: ActivityStore
}

export const store: Store = {
    activityStore: new ActivityStore()
}

export const StoreContext = createContext(store);

export function UseStore()
{
    return useContext(StoreContext)
}