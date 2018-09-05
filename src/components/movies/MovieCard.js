import React, {Component} from 'react'
import {Card, Icon, Image, Label} from 'semantic-ui-react'
import * as PropTypes from 'prop-types';
import {withRouter} from 'react-router-dom';

const printLabels = (input, clickHandler) =>
	input.split(',')
	.map(s => s.trim())
	.map((value, idx) =>
		<Label key={idx} size='tiny' content={value} onClick={clickHandler(value)}/>
	);

class MovieCard extends Component {

	onGenreClicked = value => () => {
		this.onLabelClicked('genre', value);
	};

	onDirectorClicked = value => () => {
		this.onLabelClicked('director', value);
	};

	onActorClicked = value => () => {
		this.onLabelClicked('actor', value);
	};

	onLabelClicked = (key, value) => {
		this.props.history.push(`/${key}/${value}`);
	};

	render() {
		const {movie} = this.props;
		return (
			<Card fluid color='blue'>
				<Card.Content>
					<Image floated='left' size='small' src={movie.Poster}/>
					<Card.Header><a href={`https://www.imdb.com/title/${movie.imdbID}`} target='_blank'>{movie.Title}</a></Card.Header>
					<Card.Meta>
						{printLabels(movie.Genre, this.onGenreClicked)} | {movie.Year} | {movie.Runtime} | <Icon name='star'
																																																		 color='yellow'/> {movie.imdbRating}
					</Card.Meta>
					<Card.Meta>
						{printLabels(movie.Director, this.onDirectorClicked)} | {printLabels(movie.Actors, this.onActorClicked)}
					</Card.Meta>
					{movie.Plot}
				</Card.Content>
			</Card>
		);
	}
}

MovieCard.propTypes = {
	movie: PropTypes.object.isRequired,
	history: PropTypes.object.isRequired
};

export default withRouter(MovieCard);
