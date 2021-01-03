import ACTIONTYPES from '../actions/actionTypes'

const initState = {
    sidePanelOpenStatus: false,
    openModalLogin: false,
}

export default function (state = initState, action) {
    switch (action.type) {
        case ACTIONTYPES.OPEN_MODAL:
            return {
                ...state,
                openModalLogin: action.payload,
            }
        case ACTIONTYPES.OPEN_PANEL:
            return {
                ...state,
                sidePanelOpenStatus: action.payload,
            }
        default:
            return state
    }
}