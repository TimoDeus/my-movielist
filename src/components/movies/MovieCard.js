import React, {Component} from 'react'
import {Button, Card, Icon, Image} from 'semantic-ui-react'
import * as PropTypes from 'prop-types';
import {withRouter} from 'react-router-dom';
import {filterByActor, filterByDirector, filterByGenre} from '../../actions/filter';
import {connect} from 'react-redux';

const printLabels = (input, clickHandler) =>
	input.split(',')
	.map(s => s.trim())
	.map((value, idx) =>
		<Button key={idx} size='mini' compact content={value} onClick={() => clickHandler(value)}/>
	);

class MovieCard extends Component {
	render() {
		const {movie, onGenreClicked, onActorClicked, onDirectorClicked} = this.props;
		return (
			<Card fluid color='blue'>
				<Card.Content>
					<Image floated='left' size='small' src={movie.Poster}/>
					<Card.Header>
						<a href={`https://www.imdb.com/title/${movie.imdbID}`}
							 target='_blank'>{movie.Title}</a>
					</Card.Header>
					<Card.Meta>
						{printLabels(movie.Genre, onGenreClicked)} | {movie.Year}
						| {movie.Runtime} | <Icon name='star' color='yellow'/> {movie.imdbRating}
					</Card.Meta>
					<Card.Meta>
						{printLabels(movie.Director, onDirectorClicked)} | {printLabels(movie.Actors, onActorClicked)}
					</Card.Meta>
					{movie.Plot}
				</Card.Content>
			</Card>
		);
	}
}

const mapDispatchToProps = dispatch => ({
	onGenreClicked: value => dispatch(filterByGenre(value)),
	onActorClicked: value => dispatch(filterByActor(value)),
	onDirectorClicked: value => dispatch(filterByDirector(value))
});

MovieCard.propTypes = {
	movie: PropTypes.object.isRequired,
	history: PropTypes.object.isRequired,
	onActorClicked: PropTypes.func.isRequired,
	onGenreClicked: PropTypes.func.isRequired,
	onDirectorClicked: PropTypes.func.isRequired,
};

export default withRouter(connect(null, mapDispatchToProps)(MovieCard));
