import React, {Component} from 'react'
import {Button, Card, Icon, Image} from 'semantic-ui-react'
import * as PropTypes from 'prop-types';
import {withRouter} from 'react-router-dom';
import {filterByActor, filterByDirector, filterByGenre} from '../../actions/filter';
import {connect} from 'react-redux';
import './MovieCard.css';


class MovieCard extends Component {

	wrapSearchText(text) {
		const {freetext} = this.props;
		const value = freetext ? text.replace(new RegExp('(' + freetext + ')', 'gi'), '<em>$1</em>') : text;
		return {__html: value};
	}

	printLabels(input, clickHandler) {
		return input.split(',')
			.map(s => s.trim())
			.map((value, idx) =>
				<Button key={idx} size='mini' compact onClick={() => clickHandler(value)}>
					<span dangerouslySetInnerHTML={this.wrapSearchText(value)}/>
				</Button>
			);
	}

	render() {
		const {movie, onGenreClicked, onActorClicked, onDirectorClicked} = this.props;
		return (
			<Card fluid color='blue'>
				<Card.Content>
					<Image floated='left' size='small' src={movie.Poster}/>
					<Card.Header>
						<a
							href={`https://www.imdb.com/title/${movie.imdbID}`} target='_blank'
							dangerouslySetInnerHTML={this.wrapSearchText(movie.Title)}/>
					</Card.Header>
					<Card.Meta>
						{this.printLabels(movie.Genre, onGenreClicked)} | {movie.Year} | {movie.Runtime} | <Icon
						name='star' color='yellow'/> {movie.imdbRating}
					</Card.Meta>
					<Card.Meta>
						{this.printLabels(movie.Director, onDirectorClicked)} | {this.printLabels(movie.Actors, onActorClicked)}
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

const mapStateToProps = ({filter}) => ({
	freetext: filter.freetext
});

MovieCard.propTypes = {
	movie: PropTypes.object.isRequired,
	history: PropTypes.object.isRequired,
	onActorClicked: PropTypes.func.isRequired,
	onGenreClicked: PropTypes.func.isRequired,
	onDirectorClicked: PropTypes.func.isRequired,
	freetext: PropTypes.string,
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(MovieCard));
