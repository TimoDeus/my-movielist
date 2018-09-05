import {FETCH_MOVIES} from './actionTypes';
import data from '../data/output.json';

const loadFromFile = () => Promise.resolve({data});

const fetchMovies = () => dispatch => {
	return loadFromFile().then(
		res => dispatch({
			type: FETCH_MOVIES,
			data: res.data
		}));
};

const shouldFetchMovies = ({movies}) => !movies.length;

export const fetchMoviesIfNeeded = () => (dispatch, getState) =>
	shouldFetchMovies(getState()) ? dispatch(fetchMovies()) : Promise.resolve();
