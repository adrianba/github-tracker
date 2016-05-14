import { combineReducers } from 'redux';
import repos from './repos.jsx';
import issues from './issues.jsx';

const defaultCategories = ["ready","close","high","medium","low","not set"];
const categories = (state = defaultCategories, action) => {
	return state;
};

const user = (state = {}, action) => {
	switch(action.type) {
		case 'REPOS_LOAD_END':
		case 'ISSUES_LOAD_END':
			return Object.assign({}, state, {
				user: action.user,
			});

		default:
			return state;
	}
};

export default combineReducers({
	categories,
	repos,
	issues,
	user
});