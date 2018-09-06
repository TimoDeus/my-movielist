import {combineReducers} from 'redux';
import movies from './movies';
import filter from './filter';
import sort from './sort';

const combinedReducers = combineReducers({
	movies,
	filter,
	sort
});

export default combinedReducers;
