import { SET_ALL_BATCHES } from "../constant"



export const setAllBatches = (value) => async dispatch => {
    dispatch({ type: SET_ALL_BATCHES, payload: value })
}


// export const setActiveNotice = (value) => async dispatch => {
//     dispatch({ type: SET_ACTIVE_NOTICE, payload: value })
// }
// export const setActiveNoticeDatas = (value) => async dispatch => {
//     dispatch({ type: SET_ACTIVE_NOTICE_DATAS, payload: value })
// }