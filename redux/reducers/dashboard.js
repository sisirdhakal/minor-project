import { SIDEBARTOGGLE } from "../constant";

const initialState = {
    sidebarToggle: true,


}

const dashboard_reducer = (state = initialState, action) => {
    if (action.type === SIDEBARTOGGLE) {
        return { ...state, sidebarToggle: action.payload }
    }
    else {
        return state;
    }

}

export default dashboard_reducer