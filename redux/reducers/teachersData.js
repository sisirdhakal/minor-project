import dayjs from "dayjs";
import {
    ATTENDANCEDATE,
    GET_lECTURES_BEGIN,
    GET_lECTURES_ERROR,
    GET_lECTURES_SUCCESS,
    GET_PRLABS_SUCCESS,
    SET_SINGLE_LECTURE
} from "../constant";

const initialState = {
    theoryLectures: [],
    practicalLectures: [],
    lectures_loading: false,
    lectures_error: false,
    singleLecture: null,
    attendanceDate: dayjs(new Date())
}

const teachersData_reducer = (state = initialState, action) => {
    if (action.type === GET_lECTURES_BEGIN) {
        return { ...state, lectures_loading: true }
    }
    if (action.type === ATTENDANCEDATE) {
        return { ...state, attendanceDate: action.payload }
    }
    if (action.type === SET_SINGLE_LECTURE) {
        const { id, lecture } = action.payload
        const singleLecture = lecture.find(item => item.id === Number(id))
        return { ...state, singleLecture: singleLecture }
    }
    if (action.type === GET_lECTURES_SUCCESS) {
        return {
            ...state,
            lectures_loading: false,
            theoryLectures: action.payload
        }
    }
    if (action.type === GET_PRLABS_SUCCESS) {
        return {
            ...state,
            lectures_loading: false,
            practicalLectures: action.payload
        }
    }
    if (action.type === GET_lECTURES_ERROR) {
        return { ...state, lectures_loading: false, lectures_error: true }
    }
    else {
        return state;
    }

}

export default teachersData_reducer