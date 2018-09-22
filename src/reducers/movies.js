import {FETCH_MOVIES} from '../actions/actionTypes';

const initialState = {data: []};

const processData = ({data}) => ({
	genres: [...new Set(data.map(item => item.Genre.split(', ')).flat())],
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
