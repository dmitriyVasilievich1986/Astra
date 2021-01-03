import ACTIONTYPES from './actionTypes'
import axios from 'axios'

export const setSidePanelStatus = (sidePanelStatus) => dispatch => {
    dispatch({
        type: ACTIONTYPES.OPEN_PANEL,
        payload: sidePanelStatus,
    })
}

export const setModalStatus = modalPanelStatus => dispatch => {
    dispatch({
        type: ACTIONTYPES.OPEN_MODAL,
        payload: modalPanelStatus,
    })
}

export const updateUser = newUserData => dispatch => {
    dispatch({
        type: ACTIONTYPES.GET_USER,
        payload: newUserData,
    })
}

export const clearUser = () => dispatch => {
    dispatch({
        type: ACTIONTYPES.CLEAR_USER
    })

}

export const getUser = () => (dispatch, getState,) => {
    dispatch({ type: ACTIONTYPES.USER_LOADING, payload: true })

    const token = getState().auth.token

    const context = {
        headers: {
            'Content-Type': 'application/json'
        }
    }

    if (token)
        context.headers['Authorization'] = `Token ${token}`

    axios.get('/api/auth/user', context)
        .then(data => dispatch({
            type: ACTIONTYPES.GET_USER,
            payload: data.data,
        }))
        .catch(err => { console.log(err); dispatch({ type: ACTIONTYPES.USER_LOADING, paylaod: false }) })
}

export const changeUserData = newUserData => dispatch => {
    if (newUserData.token && newUserData.user) {
        dispatch({
            type: ACTIONTYPES.CHANGE_USER_DATA,
            payload: newUserData,
        })
    }
}

export const getFullCatalog = () => dispatch => {
    axios.get('/api/fullcatalog/names_only/')
        .then(data => dispatch({
            type: ACTIONTYPES.GET_FULL_CATALOG,
            payload: data.data
        })).catch(err => console.log(err))
    axios.get('/api/catalog/names_only/')
        .then(data => dispatch({
            type: ACTIONTYPES.GET_CATALOG,
            payload: data.data
        })).catch(err => console.log(err))
}