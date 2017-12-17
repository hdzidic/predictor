import {combineReducers} from 'redux';
import { reducer as formReducer } from 'redux-form';
import FixtureReducer from './fixtureReducer';


const rootReducer = combineReducers({
  fixtures: FixtureReducer,
  form: formReducer
});

export default rootReducer;
