import { setUserDetails } from "../actionCreators";
import { SET_ADMIN_DASHBOARD, SET_ALL_BATCHES, SET_ALL_CLASSES, SET_ALL_DEPARTMENTS, SET_ALL_PROGRAMS, SET_ALL_TEACHERS, SET_SUCCESS_FALSE, SET_USER_DETAILS } from "../constant";

const initialState = {
    allBatches: {data:[], success:false},
    allDepartments: {data:[], success:false},
    allPrograms: {data:[], success:false},
    allClasses: {data:[], success:false},
    allTeachers: {data:[], success:false},
    userDetails: null,
    adminDashboard: {data:{}, success:false},
}

const collegeadmin_reducer = (state = initialState, action) => {
    if (action.type === SET_ADMIN_DASHBOARD) {
        return { ...state, adminDashboard: {data: action.payload, success:true} }
    }
    if (action.type === SET_ALL_BATCHES) {
        return { ...state, allBatches: {data: action.payload, success:true} }
    }
    if (action.type === SET_ALL_DEPARTMENTS) {
        return { ...state, allDepartments: {data: action.payload, success:true} }
    }
    if (action.type === SET_ALL_PROGRAMS) {
        return { ...state, allPrograms:{data: action.payload, success:true} }
    }
    if (action.type === SET_ALL_CLASSES) {
        return { ...state, allClasses: {data: action.payload, success:true} }
    }
    if (action.type === SET_ALL_TEACHERS) {
        return { ...state, allTeachers: {data: action.payload, success:true} }
    }
    if (action.type === SET_USER_DETAILS) {
        return { ...state, userDetails: action.payload }
    }
    if (action.type === SET_SUCCESS_FALSE) {
        if(action.payload === 'collegeadmin_allBatches'){
            return { ...state, allBatches: {data: [], success:false} }
        }
        if(action.payload === 'collegeadmin_allDepartments'){
            return { ...state, allDepartments: {data: [], success:false} }
        }
        if(action.payload === 'collegeadmin_allClasses'){
            return { ...state, allClasses: {data: [], success:false} }
        }
        if(action.payload === 'collegeadmin_allPrograms'){
            return { ...state, allPrograms: {data: [], success:false} }
        }
    }
    else {
        return state;
    }

}

export default collegeadmin_reducer