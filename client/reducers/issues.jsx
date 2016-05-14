const issues = (state = {}, action) => {
	switch(action.type) {
		case 'ISSUES_LOAD_START':
			return Object.assign({}, state, {
				isFetchingIssues: true
			});

		case 'ISSUES_LOAD_END':
			return Object.assign({}, state, {
				list: action.issues,
				isFetchingIssues: false
			});

		case 'SET_CURRENTREPO':
			return Object.assign({}, state, {
				list: null
			});

		case 'UPDATE_ISSUE_DATA':
			return Object.assign({}, state, {
				list: state.list.map(issue => 
					(issue.number===action.issueNumber)
					? Object.assign({}, issue, {
						tracker: Object.assign({}, issue.tracker, action.data)
					})
					: issue
				)
			});

		default:
			return state;
	}
};

export default issues;