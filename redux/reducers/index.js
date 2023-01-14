import { combineReducers } from "redux";
import auth_reducer from "./auth";
import dashboard_reducer from "./dashboard";
import signup_reducer from "./signup";

const reducers = combineReducers({
    auth: auth_reducer,
    dashboard: dashboard_reducer,
    signup: signup_reducer
})

export default reducers;