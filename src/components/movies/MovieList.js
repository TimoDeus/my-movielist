import React, {Component} from 'react'
import {Button, Card, Container, Divider, Header} from 'semantic-ui-react'
import MovieCard from './MovieCard';
import {connect} from 'react-redux';
import {fetchMoviesIfNeeded} from '../../actions/movies';
import * as PropTypes from 'prop-types';
import {scrollToTop} from '../../utils/scrolling';

const PREVIEW_SIZE = 10;

class MovieList extends Component {

	constructor() {
		super();
		this.state = {showAll: false};
	}

	componentDidMount() {
		this.props.fetchMoviesIfNeeded();
	}

	componentWillReceiveProps(nextProps) {
		if (this.props.movies.length !== nextProps.movies.length) {
			this.setState({showAll: false});
			scrollToTop();
		}
	}

	render() {
		const {filter, movies} = this.props;
		const {showAll} = this.state;
		const totalSize = movies.length;
		const moviesToDisplay = showAll ? movies : movies.slice(0, PREVIEW_SIZE);
		return (
			<Container text>
				{moviesToDisplay && (
					<div>
						<Header as='h1'>{getTitleByFilter(filter)} ({totalSize})</Header>
						<Card.Group>
							{moviesToDisplay.map(movie => <MovieCard key={movie.imdbID} movie={movie}/>)}
						</Card.Group>
						{!showAll && totalSize > PREVIEW_SIZE && (
							<div>
								<Divider/>
								<Button content='Mehr anzeigen' basic fluid onClick={() => this.setState({showAll: true})}/>
							</div>
						)}
					</div>
				)}
			</Container>
		);
	}
}

const getTitleByFilter = filter => {
	if (filter.bookmarksOnly) {
		return 'Merkliste';
	} else if (filter.director) {
		return 'Filme von Regisseur ' + filter.director;
	} else if (filter.actor) {
		return 'Filme mit Schauspieler(in) ' + filter.actor;
	} else if (filter.genre) {
		return 'Filme des Genres ' + filter.genre;
	} else if (filter.freetext && filter.freetext.length > 2) {
		return 'Ergebnisse für Suche "' + filter.freetext + '"';
	} else {
		return 'Alle Filme';
	}
};

const filterByBookmarks = (movies, bookmarks) =>
	movies.filter(e => bookmarks.includes(e.imdbID));

const filterByKey = (movies, key, value) =>
	movies.filter(e => e[key].toUpperCase().match(value.toUpperCase()));

const filterByFreetext = (movies, value) => {
	const freetext = value.trim().toUpperCase();
	return movies.filter(e =>
		e['Title'].toUpperCase().match(freetext) ||
		e['Actors'].toUpperCase().match(freetext) ||
		e['Director'].toUpperCase().match(freetext) ||
		e['Genre'].toUpperCase().match(freetext)
	);
};


const applyFilter = (allMovies, filter, bookmarks) => {
	if (filter.bookmarksOnly) {
		return filterByBookmarks(allMovies, bookmarks)
	} else if (filter.director) {
		return filterByKey(allMovies, 'Director', filter.director);
	} else if (filter.actor) {
		return filterByKey(allMovies, 'Actors', filter.actor);
	} else if (filter.genre) {
		return filterByKey(allMovies, 'Genre', filter.genre);
	} else if (filter.freetext && filter.freetext.length > 2) {
		return filterByFreetext(allMovies, filter.freetext);
	} else {
		return allMovies;
	}
};

const sortResults = (results, keyToSort, asc = true) =>
	results.slice().sort((a, b) => {
		const res = a[keyToSort] > b[keyToSort] ? 1 : (a[keyToSort] < b[keyToSort] ? -1 : 0);
		return !asc ? res * -1 : res;
	});

const getMovies = (allMovies, filter, sort, bookmarks) => {
	if (allMovies && allMovies.length) {
		const filtered = applyFilter(allMovies, filter, bookmarks);
		return sortResults(filtered, sort.name, sort.asc);
	} else {
		return [];
	}
};

const mapDispatchToProps = dispatch => ({
	fetchMoviesIfNeeded: () => dispatch(fetchMoviesIfNeeded())
});

const mapStateToProps = ({movies, filter, sort, bookmark}) => ({
	movies: getMovies(movies.data, filter, sort, bookmark.bookmarks),
	filter,
	sort
});

MovieList.propTypes = {
	movies: PropTypes.array.isRequired,
	filter: PropTypes.object.isRequired,
	fetchMoviesIfNeeded: PropTypes.func.isRequired
};

export default connect(mapStateToProps, mapDispatchToProps)(MovieList);
