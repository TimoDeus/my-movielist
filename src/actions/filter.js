import {FILTER_BY_ACTOR, FILTER_BY_DIRECTOR, FILTER_BY_GENRE} from './actionTypes';

export const filterByDirector = data => dispatch => dispatch({type: FILTER_BY_DIRECTOR, data});
export const filterByActor = data => dispatch => dispatch({type: FILTER_BY_ACTOR, data});
export const filterByGenre = data => dispatch => dispatch({type: FILTER_BY_GENRE, data});