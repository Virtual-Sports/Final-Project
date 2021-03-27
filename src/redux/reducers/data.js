import { SET_DATA, SET_LOADED, SET_WIDTH } from '../actions/constants'

const initialState = {
    data: {
        providers: [],
        categories: [],
        tags: [],
        games: [],
    },
    isLoaded: false,
    width: null,
}

// TODO: mb rename that
const data = (state = initialState, action) => {
    switch (action.type) {
        case SET_WIDTH:
            return state.width === action.payload
                ? { ...state }
                : { ...state, width: action.payload }
        case SET_DATA:
            return {
                ...state,
                data: action.payload,
                isLoaded: true,
            }
        case SET_LOADED:
            return {
                ...state,
                isLoaded: action.payload,
            }
        default:
            return state
    }
}

export default data
