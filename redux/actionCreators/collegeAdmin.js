import { SET_ADMIN_DASHBOARD, SET_ALL_BATCHES, SET_ALL_CLASSES, SET_ALL_DEPARTMENTS, SET_ALL_PROGRAMS, SET_SUCCESS_FALSE, SET_USER_DETAILS } from "../constant"



export const setAllBatches = (value) => async dispatch => {
    dispatch({ type: SET_ALL_BATCHES, payload: value })
}

export const setAllDepartments = (value) => async dispatch => {
    dispatch({ type: SET_ALL_DEPARTMENTS, payload: value })
}

export const setAllPrograms = (value) => async dispatch => {
    dispatch({ type: SET_ALL_PROGRAMS, payload: value })
}

export const setAllClasses = (value) => async dispatch => {
    dispatch({ type: SET_ALL_CLASSES, payload: value })
}

export const setUserDetails = (value) => async dispatch => {
    dispatch({ type: SET_USER_DETAILS, payload: value })
}

export const setAdminDashboard = (value) => async dispatch => {
    dispatch({ type: SET_ADMIN_DASHBOARD, payload: value })
}

export const setSuccessFalse = (value) => async dispatch => {
    dispatch({ type: SET_SUCCESS_FALSE , payload: value })
}


// export const setActiveNotice = (value) => async dispatch => {
//     dispatch({ type: SET_ACTIVE_NOTICE, payload: value })
// }
// export const setActiveNoticeDatas = (value) => async dispatch => {
//     dispatch({ type: SET_ACTIVE_NOTICE_DATAS, payload: value })
// }