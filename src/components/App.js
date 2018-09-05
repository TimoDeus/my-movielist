import React, {Component} from 'react';
import 'semantic-ui-css/semantic.min.css';
import Header from './header/Header';
import MovieList from './movies/MovieList';
import {Route} from 'react-router-dom';

class App extends Component {
	render() {
		return (
			<div className="App">
				<Header/>
				<Route exact path='/genre/:genre' render={({match}) =>
					<MovieList genre={match.params.genre}/>
				}/>
				<Route exact path='/actor/:actor' render={({match}) =>
					<MovieList actor={match.params.actor}/>
				}/>
				<Route exact path='/director/:director' render={({match}) =>
					<MovieList director={match.params.director}/>
				}/>
				<Route exact path='/' render={() =>
					<MovieList/>
				}/>
			</div>
		);
	}
}

export default App;
