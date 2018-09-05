import React, {Component} from 'react'
import {Card, Container, Header} from 'semantic-ui-react'
import MovieCard from './MovieCard';
import {connect} from 'react-redux';
import {fetchMoviesIfNeeded} from '../../actions/movies';
import * as PropTypes from 'prop-types';

class MovieList extends Component {

	constructor() {
		super();
		this.state = {results: []};
	}

	componentDidMount() {
		this.props.fetchMoviesIfNeeded();
	}

	componentWillReceiveProps(nextProps) {
		const filtered = applyFilter(nextProps);
		const sorted = sortResults(filtered, 'imdbRating', false);
		this.setState({results: sorted});
	}

	render() {
		const {filter} = this.props;
		const data = this.state.results;
		return (
			<Container text>
				{data && (
					<div>
						<Header as='h1'>{getTitleByFilter(filter)} ({data.length})</Header>
						<Card.Group>
							{data.map(movie => <MovieCard key={movie.imdbID} movie={movie}/>)}
						</Card.Group>
					</div>
				)}
			</Container>
		);
	}
}

const getTitleByFilter = filter => {
	if (filter.director) {
		return "Filme von Regisseur " + filter.director;
	} else if (filter.actor) {
		return "Filme mit Schauspieler(in) " + filter.actor;
	} else if (filter.genre) {
		return "Filme des Genres " + filter.genre;
	} else {
		return "Alle Filme";
	}
};

const filterByKey = (props, key, value) => {
	const {movies} = props;
	return movies.data.filter(e => e[key].match(value))
};

const applyFilter = props => {
	const {filter} = props;
	if (filter.director) {
		return filterByKey(props, 'Director', filter.director);
	} else if (filter.actor) {
		return filterByKey(props, 'Actors', filter.actor);
	} else if (filter.genre) {
		return filterByKey(props, 'Genre', filter.genre);
	} else {
		return props.movies.data;
	}
};

const sortResults = (results, keyToSort, asc = true) =>
	results.slice().sort((a, b) => {
		const res = a[keyToSort] > b[keyToSort] ? 1 : (a[keyToSort] < b[keyToSort] ? -1 : 0);
		return !asc ? res * -1 : res;
	});

const mapDispatchToProps = dispatch => ({
	fetchMoviesIfNeeded: () => dispatch(fetchMoviesIfNeeded())
});

const mapStateToProps = ({movies, filter}) => ({
	movies,
	filter
});

MovieList.propTypes = {
	movies: PropTypes.object.isRequired,
	filter: PropTypes.object.isRequired,
	fetchMoviesIfNeeded: PropTypes.func.isRequired
};

export default connect(mapStateToProps, mapDispatchToProps)(MovieList);
