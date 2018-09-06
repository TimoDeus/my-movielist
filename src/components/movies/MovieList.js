import React, {Component} from 'react'
import {Button, Card, Container, Divider, Header} from 'semantic-ui-react'
import MovieCard from './MovieCard';
import {connect} from 'react-redux';
import {fetchMoviesIfNeeded} from '../../actions/movies';
import * as PropTypes from 'prop-types';

class MovieList extends Component {

	constructor() {
		super();
		this.state = {showAll: false};
	}

	componentDidMount() {
		this.props.fetchMoviesIfNeeded();
	}

	componentWillReceiveProps(nextProps) {
		if (this.props.movies !== nextProps.movies) {
			this.setState({showAll: false});
		}
	}

	render() {
		const {filter, movies} = this.props;
		const {showAll} = this.state;
		const totalSize = movies.length;
		const moviesToDisplay = showAll ? movies : movies.slice(0,10);
		return (
			<Container text>
				{moviesToDisplay && (
					<div>
						<Header as='h1'>{getTitleByFilter(filter)} ({totalSize})</Header>
						<Card.Group>
							{moviesToDisplay.map(movie => <MovieCard key={movie.imdbID} movie={movie}/>)}
						</Card.Group>
						{!showAll && (
							<div>
								<Divider/>
								<Button content='Mehr anzeigen' basic fluid onClick={() => this.setState({showAll: true})} />
							</div>
						)}
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

const filterByKey = (movies, key, value) =>
	movies.filter(e => e[key].match(value));

const applyFilter = (allMovies, filter) => {
	if (filter.director) {
		return filterByKey(allMovies, 'Director', filter.director);
	} else if (filter.actor) {
		return filterByKey(allMovies, 'Actors', filter.actor);
	} else if (filter.genre) {
		return filterByKey(allMovies, 'Genre', filter.genre);
	} else {
		return allMovies;
	}
};

const sortResults = (results, keyToSort, asc = true) =>
	results.slice().sort((a, b) => {
		const res = a[keyToSort] > b[keyToSort] ? 1 : (a[keyToSort] < b[keyToSort] ? -1 : 0);
		return !asc ? res * -1 : res;
	});

const getMovies = (allMovies, filter, sort) => {
	if (allMovies && allMovies.length) {
		const filtered = applyFilter(allMovies, filter);
		return sortResults(filtered, sort.name, sort.asc);
	} else {
		return [];
	}
};

const mapDispatchToProps = dispatch => ({
	fetchMoviesIfNeeded: () => dispatch(fetchMoviesIfNeeded())
});

const mapStateToProps = ({movies, filter, sort}) => ({
	movies: getMovies(movies.data, filter, sort),
	filter,
	sort
});

MovieList.propTypes = {
	movies: PropTypes.object.isRequired,
	filter: PropTypes.object.isRequired,
	fetchMoviesIfNeeded: PropTypes.func.isRequired
};

export default connect(mapStateToProps, mapDispatchToProps)(MovieList);
