import ACTIONTYPES from '../actions/actionTypes'

const initState = {
    token: localStorage.getItem("token"),
    isAuthenticated: null,
    isLoading: true,
    user: null,
}

export default function (state = initState, action) {
    switch (action.type) {
        case ACTIONTYPES.CLEAR_USER:
            localStorage.removeItem('token')
            return {
                ...state,
                isAuthenticated: false,
                isLoading: false,
                token: null,
                user: null,
            }
        case ACTIONTYPES.USER_LOADING:
            return {
                ...state,
                isLoading: action.payload,
            }
        case ACTIONTYPES.GET_USER:
            return {
                ...state,
                user: action.payload,
                isAuthenticated: true,
                isLoading: false,
            }
        case ACTIONTYPES.CHANGE_USER_DATA:
            localStorage.setItem('token', action.payload.token)
            return {
                ...state,
                token: action.payload.token,
                user: action.payload.user,
                isAuthenticated: true,
            }
        default:
            return state
    }
}