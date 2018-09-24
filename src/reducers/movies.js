import {FETCH_MOVIES} from '../actions/actionTypes';

const initialState = {data: []};

const flatten = arr => arr.reduce((flat, toFlatten) => flat.concat(Array.isArray(toFlatten) ? flatten(toFlatten) : toFlatten), []);

const getGenres = data => {
	const arrays = data.map(item => item.Genre.split(', '));
	const flat = flatten(arrays);
	return new Set(flat);
};

const processData = ({data}) => ({
	genres: [...getGenres(data)],
	data
});

const movies = (state = initialState, action) => {
	switch (action.type) {
		case FETCH_MOVIES:
			return {...state, ...processData(action)};
		default:
			return state;
	}
};

export default movies;
