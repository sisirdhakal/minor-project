import { SET_ACTIVE_NOTICE, SET_ACTIVE_NOTICE_DATAS } from "../constant"
import { SET_ALL_NOTICES } from "../constant"





export const setAllNotices = (value) => async dispatch => {
    dispatch({ type: SET_ALL_NOTICES, payload: value })
}


export const setActiveNotice = (value) => async dispatch => {
    dispatch({ type: SET_ACTIVE_NOTICE, payload: value })
}
export const setActiveNoticeDatas = (value) => async dispatch => {
    dispatch({ type: SET_ACTIVE_NOTICE_DATAS, payload: value })
}