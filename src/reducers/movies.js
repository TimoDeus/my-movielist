import {FETCH_MOVIES} from '../actions/actionTypes';

const initialState = {data: []};

const movies = (state = initialState, action) => {
	switch (action.type) {
		case FETCH_MOVIES:
			return {...state, data: action.data};
		default:
			return state;
	}
};

export default movies;
