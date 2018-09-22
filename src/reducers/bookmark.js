import {ADD_BOOKMARK, REMOVE_BOOKMARK} from '../actions/actionTypes';

const initialState = {
	bookmarks: []
};

const bookmark = (state = initialState, action) => {
	switch (action.type) {
		case ADD_BOOKMARK:
			return {...state, bookmarks: [...new Set(state.bookmarks).add(action.data)]};
		case REMOVE_BOOKMARK: {
			const newBookmarks = new Set(state.bookmarks);
			newBookmarks.delete(action.data);
			return {...state, bookmarks: [...newBookmarks]};
		}
		default:
			return state;
	}
};

export default bookmark;
