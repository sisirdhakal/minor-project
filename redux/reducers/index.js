import { combineReducers } from "redux";
import auth_reducer from "./auth";

const reducers = combineReducers({
    auth: auth_reducer
})

export default reducers;