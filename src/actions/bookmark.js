import {ADD_BOOKMARK, REMOVE_BOOKMARK} from './actionTypes';

export const addBookmark = id => dispatch => dispatch({type: ADD_BOOKMARK, data: id});
export const removeBookmark = id => dispatch => dispatch({type: REMOVE_BOOKMARK, data: id});
