import React from 'react'
import {Button, Container, Dropdown, Icon, Input, Menu} from 'semantic-ui-react'
import {connect} from 'react-redux';
import {filterByBookmarks, filterByFreetext, filterByGenre, resetFilter} from '../../actions/filter';
import * as PropTypes from 'prop-types';
import {setSortOrder} from '../../actions/sort';

const Header = props => {
	const {filter, sort, onSetSorting, genres, onGenreClicked, onBookmarkClicked, bookmarkCount, onResetFilter} = props;
	const hasFilter = filter.actor || filter.director || filter.genre || filter.freetext || filter.bookmarksOnly;
	const sortOptions = [
		{name: 'Title', title: 'Titel', asc: true},
		{name: 'imdbRating', title: 'Bewertung', asc: false}
	];
	return (
		<Container>
			<Menu inverted>
				<Menu.Item header onClick={onResetFilter}>
					<Icon name='film' style={{marginRight: '1.5em'}}/>
					Filmliste
				</Menu.Item>
				{genres && <Dropdown scrolling item text='Genres'>
					<Dropdown.Menu>
						{genres.sort().map(genre =>
							<Dropdown.Item key={genre} onClick={() => onGenreClicked(genre)}>{genre}</Dropdown.Item>)}
					</Dropdown.Menu>
				</Dropdown>
				}
				<Menu.Item onClick={onBookmarkClicked}>
					Merkliste {bookmarkCount ? `(${bookmarkCount})` : ''}
				</Menu.Item>
				<Menu.Menu position='right'>
					<Menu.Item>
						<Input icon='search' placeholder='Suche...' onChange={props.onSearch} value={filter.freetext || ''}/>
					</Menu.Item>
				</Menu.Menu>
			</Menu>
			<Menu text>
				<Menu.Item header>Sortieren</Menu.Item>
				{sortOptions.map(data =>
					<Menu.Item
						key={data.name} name={data.title} active={sort.name === data.name}
						onClick={() => onSetSorting(data)}/>
				)}
				{hasFilter && (
					<Menu.Menu position='right'>
						<Menu.Item>
							<Button onClick={onResetFilter}>Filter zurücksetzen</Button>
						</Menu.Item>
					</Menu.Menu>
				)}
			</Menu>
		</Container>
	);
};

const mapDispatchToProps = dispatch => ({
	onResetFilter: () => dispatch(resetFilter()),
	onSetSorting: data => dispatch(setSortOrder(data)),
	onSearch: e => dispatch(filterByFreetext(e.target.value)),
	onGenreClicked: genre => dispatch(filterByGenre(genre)),
	onBookmarkClicked: () => dispatch(filterByBookmarks()),
});

const mapStateToProps = ({movies, filter, sort, bookmark}) => ({
	filter,
	sort,
	genres: movies.genres,
	bookmarkCount: bookmark.bookmarks.length
});

Header.propTypes = {
	filter: PropTypes.object.isRequired,
	sort: PropTypes.object.isRequired,
	genres: PropTypes.array,
	onResetFilter: PropTypes.func.isRequired,
	onSetSorting: PropTypes.func.isRequired,
	onGenreClicked: PropTypes.func.isRequired,
	onBookmarkClicked: PropTypes.func.isRequired,
	onSearch: PropTypes.func.isRequired,
	bookmarkCount: PropTypes.number.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);
