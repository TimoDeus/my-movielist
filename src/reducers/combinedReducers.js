import {combineReducers} from 'redux';
import movies from './movies';
import filter from './filter';
import sort from './sort';
import bookmark from './bookmark';

const combinedReducers = combineReducers({
	movies,
	filter,
	sort,
	bookmark
});

export default combinedReducers;
