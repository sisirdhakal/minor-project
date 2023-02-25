import {
    SIDEBARTOGGLE,
    SIDEBARUSER,
    USERNAME
} from '../constant'

/**
 * sidebars
 */
export const sidebarToggle = (value) => dispatch => {
    dispatch({ type: SIDEBARTOGGLE, payload: value })
}
export const sidebarUser = (value) => dispatch => {
    dispatch({ type: SIDEBARUSER, payload: value })
}
export const setUserName = (value) => dispatch => {
    dispatch({ type: USERNAME, payload: value })
}