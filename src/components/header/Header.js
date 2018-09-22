import React from 'react'
import {Button, Container, Icon, Input, Menu,} from 'semantic-ui-react'
import {connect} from 'react-redux';
import {filterByFreetext, resetFilter} from '../../actions/filter';
import * as PropTypes from 'prop-types';
import {setSortOrder} from '../../actions/sort';

const Header = props => {
	const {filter, sort, onSetSorting} = props;
	const hasFilter = filter.actor || filter.director || filter.genre || filter.freetext;
	const sortOptions = [
		{name: 'Title', title: 'Titel', asc: true},
		{name: 'imdbRating', title: 'Bewertung', asc: false}
	];
	return (
		<Container>
			<Menu inverted>
				<Menu.Item header>
					<Icon name='film' style={{marginRight: '1.5em'}}/>
					Filmliste
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
					<Menu.Item key={data.name} name={data.title} active={sort.name === data.name} onClick={() => onSetSorting(data)}/>
				)}
				{hasFilter && (
					<Menu.Menu position='right'>
						<Menu.Item>
							<Button onClick={props.onResetFilter}>Filter zurücksetzen</Button>
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
	onSearch: e => dispatch(filterByFreetext(e.target.value))
});

const mapStateToProps = ({filter, sort}) => ({
	filter,
	sort
});

Header.propTypes = {
	filter: PropTypes.object.isRequired,
	sort: PropTypes.object.isRequired,
	onResetFilter: PropTypes.func.isRequired,
	onSetSorting: PropTypes.func.isRequired,
	onSearch: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);
