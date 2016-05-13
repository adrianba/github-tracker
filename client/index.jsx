import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import reduxThunk from 'redux-thunk';
import reducer from './reducer.jsx';
import TheApp from './containers/app.jsx'
import { fetchRepos } from './actions/repos.jsx';
//import Perf from 'react-addons-perf';
//window.Perf = Perf;

let store = createStore(
	reducer,
	applyMiddleware(
		reduxThunk
	)
);

ReactDOM.render(<Provider store={store}><TheApp /></Provider>, document.getElementById('app'));
store.dispatch(fetchRepos());