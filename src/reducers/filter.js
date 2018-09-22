import {
	FILTER_BY_ACTOR,
	FILTER_BY_BOOKMARKS,
	FILTER_BY_DIRECTOR,
	FILTER_BY_FREETEXT,
	FILTER_BY_GENRE,
	RESET_FILTER
} from '../actions/actionTypes';

const initialState = {
	bookmarksOnly: false,
	genre: undefined,
	actor: undefined,
	director: undefined,
	freetext: undefined
};

const filter = (state = initialState, action) => {
	switch (action.type) {
		case FILTER_BY_BOOKMARKS:
			return {...state, ...initialState, bookmarksOnly: true};
		case FILTER_BY_ACTOR:
			return {...state, ...initialState, actor: action.data};
		case FILTER_BY_DIRECTOR:
			return {...state, ...initialState, director: action.data};
		case FILTER_BY_GENRE:
			return {...state, ...initialState, genre: action.data};
		case FILTER_BY_FREETEXT:
			return {...state, ...initialState, freetext: action.data};
		case RESET_FILTER:
			return {...state, ...initialState};
		default:
			return state;
	}
};

export default filter;
