import {ADD_BOOKMARK, REMOVE_BOOKMARK} from '../actions/actionTypes';

const initialState = {
	bookmarks: []
};

const bookmark = (state = initialState, action) => {
	switch (action.type) {
		case ADD_BOOKMARK:
			return {...state, bookmarks: [...new Set(state.bookmarks).add(action.data)]};
		case REMOVE_BOOKMARK:
			return {...state, bookmarks: [...new Set(state.bookmarks).delete(action.data)]};
		default:
			return state;
	}
};

export default bookmark;
