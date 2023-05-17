import { SET_ALL_BATCHES } from "../constant";

const initialState = {
    allBatches: [],
}

const collegeadmin_reducer = (state = initialState, action) => {
    if (action.type === SET_ALL_BATCHES) {
        return { ...state, allBatches: action.payload }
    }
    else {
        return state;
    }

}

export default collegeadmin_reducer