import {FILTER_BY_GENRE, FILTER_BY_ACTOR, FILTER_BY_DIRECTOR, RESET_FILTER} from '../actions/actionTypes';

const initialState = {
	genre: undefined,
	actor: undefined,
	director: undefined
};

const filter = (state = initialState, action) => {
	switch (action.type) {
		case FILTER_BY_ACTOR:
			return {...state, ...initialState, actor: action.data};
		case FILTER_BY_DIRECTOR:
			return {...state, ...initialState, director: action.data};
		case FILTER_BY_GENRE:
			return {...state, ...initialState, genre: action.data};
		case RESET_FILTER:
			return {...state, ...initialState};
		default:
			return state;
	}
};

export default filter;
