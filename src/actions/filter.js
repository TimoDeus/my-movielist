import {FILTER_BY_ACTOR, FILTER_BY_DIRECTOR, FILTER_BY_GENRE, FILTER_BY_FREETEXT, RESET_FILTER} from './actionTypes';

export const filterByDirector = data => dispatch => dispatch({type: FILTER_BY_DIRECTOR, data});
export const filterByActor = data => dispatch => dispatch({type: FILTER_BY_ACTOR, data});
export const filterByGenre = data => dispatch => dispatch({type: FILTER_BY_GENRE, data});
export const filterByFreetext = data => dispatch => dispatch({type: FILTER_BY_FREETEXT, data});
export const resetFilter = () => dispatch => dispatch({type: RESET_FILTER});
