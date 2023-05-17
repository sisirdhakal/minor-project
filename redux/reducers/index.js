import { combineReducers } from "redux";
import attendance_reducer from "./attendance";
import auth_reducer from "./auth";
import dashboard_reducer from "./dashboard";
import signup_reducer from "./signup";
import teachersData_reducer from "./teachersData";
import notices_reducer from "./notices";

const reducers = combineReducers({
    auth: auth_reducer,
    dashboard: dashboard_reducer,
    signup: signup_reducer,
    attendance: attendance_reducer,
    teachersData: teachersData_reducer,
    notices: notices_reducer
})

export default reducers;