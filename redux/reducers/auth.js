import {
    SIGNUPTOGGLE
} from "../constant";

const initialState = {
    signUpToggle: false
}

const auth_reducer = (state = initialState, action) => {
    if (action.type === SIGNUPTOGGLE) {
        return { ...state, signUpToggle: action.payload }
    }
    else {
        return state;
    }

}

export default auth_reducer