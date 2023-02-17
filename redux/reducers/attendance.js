import { ATTENDANCETYPE } from "../constant";

const initialState = {
    attendanceType: "th"
}

const attendance_reducer = (state = initialState, action) => {
    if (action.type === ATTENDANCETYPE) {
        return { ...state, attendanceType: action.payload }
    }
    else {
        return state;
    }

}

export default attendance_reducer