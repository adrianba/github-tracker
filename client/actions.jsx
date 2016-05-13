import axios from 'axios';
axios.defaults.headers.post['Content-Type'] = 'application/json';

export const loadRepos = () => {
	return {
		type: 'REPOS_LOAD'
	};
};

export const updateRepos = (repos, user, currentRepo) => {
	return {
		type: 'REPOS_UPDATE',
		repos,
		user,
		currentRepo
	};
};

export const fetchRepos = () => {
	return dispatch => {
		dispatch(loadRepos());
		axios.get("/repos"+"?"+Date.now().toString()).then(response => {
			let currentRepo = (response.data.repos && response.data.repos.length>0) ? response.data.repos[0] : undefined;
			dispatch(updateRepos(response.data.repos, response.data.user, currentRepo));
			if(currentRepo) {
				dispatch(fetchIssues(currentRepo));
			}
		}).catch(err => {
			//dispatch(loadingError(err));
			throw err;
		});
	};
};

export const loadIssues = () => {
	return {
		type: 'ISSUES_LOAD'
	};
};

export const updateIssues = (currentRepo, issues, user) => {
	return {
		type: 'ISSUES_UPDATE',
		currentRepo,
		issues,
		user
	};
};

export const fetchIssues = (currentRepo) => {
	return dispatch => {
		dispatch(loadIssues());
		axios.get("/issues/"+currentRepo+"?"+Date.now().toString()).then(response => {
			dispatch(updateIssues(currentRepo, response.data.issues, response.data.user));
		}).catch(err => {
			//dispatch(loadingError(err));
			throw err;
		});
	};
};

export const updateIssue = (currentRepo,issueNumber,data) => {
	return {
		type: 'ISSUE_UPDATE',
		currentRepo,
		issueNumber,
		data
	};
};

export const changeIssueData = (issueNumber,data) => {
	return (dispatch, getState) => {
		let currentRepo = getState().currentRepo;
		dispatch(updateIssue(currentRepo,issueNumber,data));
		axios.post("/issues/" + currentRepo + "/" + issueNumber+"?"+Date.now().toString(),data).then(response => {
			dispatch(updateIssues(currentRepo, response.data.issues, response.data.user));
		}).catch(err => {
			//dispatch(loadingError(err));
			throw err;
		});
	};
};

export const updateCurrentRepo = (currentRepo) => {
	return {
		type: 'CURRENTREPO_UPDATE',
		currentRepo
	};
};

export const changeCurrentRepo = (currentRepo) => {
	return dispatch => {
		dispatch(updateCurrentRepo(currentRepo));
		dispatch(fetchIssues(currentRepo));
	};
};