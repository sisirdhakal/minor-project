import { setUserDetails } from "../actionCreators";
import { SET_ALL_BATCHES, SET_ALL_DEPARTMENTS, SET_USER_DETAILS } from "../constant";

const initialState = {
    allBatches: [],
    allDepartments: [],
    userDetails: null
}

const collegeadmin_reducer = (state = initialState, action) => {
    if (action.type === SET_ALL_BATCHES) {
        return { ...state, allBatches: action.payload }
    }
    if (action.type === SET_ALL_DEPARTMENTS) {
        return { ...state, allDepartments: action.payload }
    }
    if (action.type === SET_USER_DETAILS) {
        return { ...state, userDetails: action.payload }
    }
    else {
        return state;
    }

}

export default collegeadmin_reducer