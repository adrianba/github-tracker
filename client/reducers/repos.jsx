const repos = (state = {}, action) => {
	switch(action.type) {
		case 'REPOS_LOAD_START':
			return Object.assign({}, state, {
				isFetchingRepos: true
			});

		case 'REPOS_LOAD_END':
			return Object.assign({}, state, {
				list: action.repos,
				currentRepo: action.currentRepo,
				isFetchingRepos: false
			});

		case 'SET_CURRENTREPO':
		case 'ISSUES_LOAD_END':
			return Object.assign({}, state, {
				currentRepo: action.currentRepo,
			});

		default:
			return state;
	}
};

export default repos;