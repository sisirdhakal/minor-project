import { setUserDetails } from "../actionCreators";
import { SET_ADMIN_DASHBOARD, SET_ALL_BATCHES, SET_ALL_CLASSES, SET_ALL_DEPARTMENTS, SET_ALL_PROGRAMS, SET_USER_DETAILS } from "../constant";

const initialState = {
    allBatches: {data:[], success:false},
    allDepartments: {data:[], success:false},
    allPrograms: {data:[], success:false},
    allClasses: {data:[], success:false},
    userDetails: null,
    adminDashboard: null,
}

const collegeadmin_reducer = (state = initialState, action) => {
    if (action.type === SET_ADMIN_DASHBOARD) {
        return { ...state, adminDashboard: action.payload }
    }
    else if (action.type === SET_ALL_BATCHES) {
        return { ...state, allBatches: {data: action.payload, success:true} }
    }
    else if (action.type === SET_ALL_DEPARTMENTS) {
        return { ...state, allDepartments: {data: action.payload, success:true} }
    }
    else if (action.type === SET_ALL_PROGRAMS) {
        return { ...state, allPrograms:{data: action.payload, success:true} }
    }
    else if (action.type === SET_ALL_CLASSES) {
        return { ...state, allClasses: {data: action.payload, success:true} }
    }
    else if (action.type === SET_USER_DETAILS) {
        return { ...state, userDetails: action.payload }
    }
    else {
        return state;
    }

}

export default collegeadmin_reducer