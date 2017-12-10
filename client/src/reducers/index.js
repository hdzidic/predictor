import {combineReducers} from 'redux';
import FixtureReducer from './fixtureReducer';

const rootReducer = combineReducers({
  fixtures: FixtureReducer
});

export default rootReducer;
