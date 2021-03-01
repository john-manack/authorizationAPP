import { combineReducers} from 'redux';
import reducerTemplate from './reducer';
import { reducer as formReducer } from 'redux-form';

export default combineReducers({
    auth: reducerTemplate,
    form: formReducer,
})