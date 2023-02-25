import {
    GET_lECTURES_BEGIN,
    GET_lECTURES_ERROR,
    GET_lECTURES_SUCCESS,
    GET_PRLABS_BEGIN,
    GET_PRLABS_ERROR,
    GET_PRLABS_SUCCESS
} from "../constant";

const initialState = {
    theoryLectures: [],
    practicalLectures: [],
    lectures_loading: false,
    lectures_error: false
}

const teachersData_reducer = (state = initialState, action) => {
    if (action.type === GET_lECTURES_BEGIN) {
        return { ...state, lectures_loading: true }
    }
    if (action.type === GET_lECTURES_SUCCESS) {
        return {
            ...state,
            lectures_loading: false,
            theoryLectures: action.payload
        }
    }
    if (action.type === GET_lECTURES_ERROR) {
        return { ...state, lectures_loading: false, lectures_error: true }
    }
    if (action.type === GET_PRLABS_BEGIN) {
        return { ...state, lectures_loading: true }
    }
    if (action.type === GET_PRLABS_SUCCESS) {
        return {
            ...state,
            lectures_loading: false,
            theoryLectures: action.payload
        }
    }
    if (action.type === GET_PRLABS_ERROR) {
        return { ...state, lectures_loading: false, lectures_error: true }
    }
    else {
        return state;
    }

}

export default teachersData_reducer