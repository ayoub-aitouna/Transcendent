import { combineReducers } from 'redux';
import userSlice from './slices/userslice';

export default combineReducers({
    user: userSlice,
});