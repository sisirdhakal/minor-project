import {
    SIGNUPDATA,
    VERIFYDATA,
} from "../constant";

const initialState = {
    verifyDetails: {
        text: "",
        idType: "",
        idNumber: "",
        dobStudent: ""
    },
    id: 0,
    verifiedStatus: false

}

const signup_reducer = (state = initialState, action) => {
    if (action.type === VERIFYDATA) {
        const { name, value } = action.payload

        return {
            ...state,
            filters: { ...state.filters, [name]: value }
        }
    }
    else {
        return state;
    }

}

export default signup_reducer