import { combineReducers } from "redux";
import auth_reducer from "./auth";
import dashboard_reducer from "./dashboard";

const reducers = combineReducers({
    auth: auth_reducer,
    dashboard: dashboard_reducer
})

export default reducers;