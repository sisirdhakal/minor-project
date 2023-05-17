import { SET_ALL_BATCHES, SET_ALL_DEPARTMENTS } from "../constant";

const initialState = {
    allBatches: [],
    allDepartments: [],
}

const collegeadmin_reducer = (state = initialState, action) => {
    if (action.type === SET_ALL_BATCHES) {
        console.log(action.payload)
        return { ...state, allBatches: action.payload }
    }
    if (action.type === SET_ALL_DEPARTMENTS) {
        console.log(action.payload)
        return { ...state, allDepartments: action.payload }
    }
    else {
        return state;
    }

}

export default collegeadmin_reducer