import {
    SIGNUPSTEPS,
    SIGNUPTOGGLE,
    SIGNUPTYPE
} from "../constant";

const initialState = {
    signUpToggle: false,
    step: 1,
    signUpDetails: {
        type: "",
        quote: "",
        steps: 0,
    }

}

const auth_reducer = (state = initialState, action) => {
    if (action.type === SIGNUPTOGGLE) {
        return { ...state, signUpToggle: action.payload }
    }

    if (action.type === SIGNUPSTEPS) {

        return { ...state, step: action.payload }
    }
    if (action.type === SIGNUPTYPE) {

        if (action.payload.toLowerCase() === "student") {

            return {
                ...state,
                signUpDetails: {
                    ...state.signUpDetails,
                    type: action.payload,
                    steps: 2,
                    quote: "The real teacher is the student’s curiosity."

                },
            }
        }
        if (action.payload.toLowerCase() === "teacher") {

            return {
                ...state,
                signUpDetails: {
                    ...state.signUpDetails,
                    type: action.payload,
                    steps: 2,
                    quote: "Teachers who love teaching, teach students to love learning."

                },
            }
        }
        if (action.payload.toLowerCase() === "parent") {

            return {
                ...state,
                signUpDetails: {
                    ...state.signUpDetails,
                    type: action.payload,
                    steps: 3,
                    quote: "Behind every child who believes himself is a parent who believed first."

                },
            }
        }
        else return { ...state }

    }
    else {
        return state;
    }

}

export default auth_reducer