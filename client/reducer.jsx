const reducer = (state = [], action) => {
	console.log(action.type);
	switch(action.type) {
		case 'REPOS_LOAD_START':
			return Object.assign({}, state, {
				isFetchingRepos: true
			});

		case 'REPOS_LOAD_END':
			return Object.assign({}, state, {
				repolist: action.repos,
				user: action.user,
				currentRepo: action.currentRepo,
				isFetchingRepos: false
			});

		case 'ISSUES_LOAD_START':
			return Object.assign({}, state, {
				isFetchingIssues: true
			});

		case 'ISSUES_LOAD_END':
			return Object.assign({}, state, {
				user: action.user,
				currentRepo: action.currentRepo,
				issues: action.issues,
				isFetchingIssues: false
			});

		case 'SET_CURRENTREPO':
			return Object.assign({}, state, {
				currentRepo: action.currentRepo,
				issues: null
			});

		case 'UPDATE_ISSUE_DATA':
			return Object.assign({}, state, {
				issues: state.issues.map(issue => 
					(issue.number===action.issueNumber)
					? Object.assign({}, issue, {
						tracker: Object.assign({}, issue.tracker, action.data)
					})
					: issue
				)
			});

		default:
			console.log('No action taken for ' + action.type);
			return state;
	}
}

export default reducer;