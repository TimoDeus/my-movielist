import React from 'react'
import {Card, Icon, Image, Label} from 'semantic-ui-react'

const printLabels = input =>
	input.split(',').map((actor, idx) => <Label key={idx} size='tiny' content={actor.trim()}/>);

const MovieCard = ({movie}) => (
	<Card fluid color='blue'>
		<Card.Content>
			<Image floated='left' size='small' src={movie.Poster}/>
			<Card.Header><a href={`https://www.imdb.com/title/${movie.imdbID}`} target='_blank'>{movie.Title}</a></Card.Header>
			<Card.Meta>
				{movie.Year} | {printLabels(movie.Genre)} | {printLabels(movie.Director)} | {movie.Runtime} | <Icon name='star' color='yellow'/> {movie.imdbRating}
			</Card.Meta>
			<Card.Meta>
				{printLabels(movie.Actors)}
			</Card.Meta>
			{movie.Plot}
		</Card.Content>
	</Card>
);

export default MovieCard;
