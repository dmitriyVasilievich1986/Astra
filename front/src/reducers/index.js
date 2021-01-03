import mainReducer from './mainReducer'
import authReducer from './authReducer'
import catalogReducer from './catalogReducer'
import { combineReducers } from 'redux'

export default combineReducers({
    mainProperties: mainReducer,
    catalog: catalogReducer,
    auth: authReducer,
})