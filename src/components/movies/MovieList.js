import React, {Component} from 'react'
import {Card, Container, Header} from 'semantic-ui-react'
import rawMovies from '../../data/output.json';
import MovieCard from './MovieCard';

class MovieList extends Component {

	constructor() {
		super();
		this.state = {movies: []};
	}

	componentDidMount() {
		this.setState({movies: rawMovies});
	}

	render() {
		const {movies} = this.state;
		return (
			<Container text>
				<Header as='h1'>Alle Filme von {this.props.director} ({movies.length})</Header>
				<Card.Group>
					{movies.map(movie => <MovieCard key={movie.imdbID} movie={movie}/>)}
				</Card.Group>
			</Container>
		);
	}
}

export default MovieList;
