import React, {Component} from 'react';
import 'semantic-ui-css/semantic.min.css';
import Header from './header/Header';
import MovieList from './movies/MovieList';

class App extends Component {
	render() {
		return (
			<div className="App">
				<Header/>
				<MovieList/>
			</div>
		);
	}
}

export default App;
