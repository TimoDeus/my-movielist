import 'core-js';
import 'raf/polyfill';
import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import registerServiceWorker from './registerServiceWorker';
import {applyMiddleware, compose, createStore} from 'redux';
import reducers from './reducers/combinedReducers';
import {Provider} from 'react-redux';
import {logger} from 'redux-logger'
import thunk from 'redux-thunk'
import {BrowserRouter} from 'react-router-dom';
import 'semantic-ui-css/semantic.min.css';
import {createCookieMiddleware, initialState} from './utils/cookieMiddleware';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;


const store = createStore(
	reducers,
	initialState,
	composeEnhancers(
		applyMiddleware(thunk, logger, createCookieMiddleware())
	)
);

ReactDOM.render(
	<Provider store={store}>
		<BrowserRouter>
			<App/>
		</BrowserRouter>
	</Provider>,
	document.getElementById('root'));
registerServiceWorker();
