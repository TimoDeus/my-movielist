import React from 'react'
import {Container, Image, Input, Menu,} from 'semantic-ui-react'
import logo from '../../logo.svg';

const Header = () => (
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
		</Menu>
	</Container>
);

export default Header;
