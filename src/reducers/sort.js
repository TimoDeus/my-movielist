import {SET_SORT_ORDER} from '../actions/actionTypes';

const initialState = {
	name: 'imdbRating',
	asc: false
};

const sort = (state = initialState, action) => {
	switch (action.type) {
		case SET_SORT_ORDER:
			return {...state, ...action.data};
		default:
			return state;
	}
};

export default sort;
