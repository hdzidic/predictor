import {combineReducers} from 'redux';
import { reducer as formReducer } from 'redux-form';
import FixtureReducer from './fixtureReducer';
import UserReducer from './userReducer';


const rootReducer = combineReducers({
  fixtures: FixtureReducer,
  form: formReducer,
  user: UserReducer
});

export default rootReducer;
