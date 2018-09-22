import React, {Component} from 'react'
import {Button, Card, Icon, Image, Label} from 'semantic-ui-react'
import * as PropTypes from 'prop-types';
import {withRouter} from 'react-router-dom';
import {filterByActor, filterByDirector, filterByGenre} from '../../actions/filter';
import {connect} from 'react-redux';
import './MovieCard.css';
import {addBookmark, removeBookmark} from '../../actions/bookmark';


class MovieCard extends Component {

	wrapSearchText(text) {
		const {freetext} = this.props;
		const value = freetext ? text.replace(new RegExp('(' + freetext.trim() + ')', 'gi'), '<em>$1</em>') : text;
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
		const {movie, onGenreClicked, onActorClicked, onDirectorClicked, removeBookmark, addBookmark, isBookmarked} = this.props;
		return (
			<Card fluid color='blue'>
				<Card.Content>
					<Label as='a' corner='right' onClick={isBookmarked ? removeBookmark(movie.imdbID) : addBookmark(movie.imdbID)}>
						<Icon name={isBookmarked ? 'bookmark' : 'bookmark outline'} color={isBookmarked ? 'yellow' : 'black'}/>
					</Label>
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
	onDirectorClicked: value => dispatch(filterByDirector(value)),
	addBookmark: value => () => dispatch(addBookmark(value)),
	removeBookmark: value => () => dispatch(removeBookmark(value))
});

const mapStateToProps = ({filter, bookmark}, ownProps) => ({
	freetext: filter.freetext,
	isBookmarked: bookmark.bookmarks.includes(ownProps.movie.imdbID)
});

MovieCard.propTypes = {
	movie: PropTypes.object.isRequired,
	history: PropTypes.object.isRequired,
	onActorClicked: PropTypes.func.isRequired,
	onGenreClicked: PropTypes.func.isRequired,
	onDirectorClicked: PropTypes.func.isRequired,
	addBookmark: PropTypes.func.isRequired,
	removeBookmark: PropTypes.func.isRequired,
	freetext: PropTypes.string,
	isBookmarked: PropTypes.bool,
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(MovieCard));
