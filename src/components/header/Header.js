import React from 'react'
import {Button, Container, Image, Input, Menu,} from 'semantic-ui-react'
import logo from '../../logo.svg';
import {connect} from 'react-redux';
import {resetFilter} from '../../actions/filter';
import * as PropTypes from 'prop-types';

const Header = props => {
	const {filter} = props;
	const hasFilter = filter.actor || filter.director || filter.genre;
	return (
		<Container>
			<Menu inverted>
				<Menu.Item as='a' header>
					<Image size='mini' src={logo} style={{marginRight: '1.5em'}}/>
					Filmliste
				</Menu.Item>
				<Menu.Menu position='right'>
					<Menu.Item>
						<Input icon='search' placeholder='Suche...'/>
					</Menu.Item>
				</Menu.Menu>
			</Menu>
			<Menu text>
				<Menu.Item header>Sortieren</Menu.Item>
				<Menu.Item name='Titel'/>
				<Menu.Item name='Bewertung'/>
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
	onResetFilter: () => dispatch(resetFilter())
});

const mapStateToProps = ({filter}) => ({
	filter
});

Header.propTypes = {
	filter: PropTypes.object.isRequired,
	onResetFilter: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);
