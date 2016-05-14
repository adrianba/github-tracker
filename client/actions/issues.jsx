import { downloadIssues, uploadIssueData } from '../lib/api.jsx';

export const loadIssues = () => {
	return {
		type: 'ISSUES_LOAD_START'
	};
};

const updateIssues = (currentRepo, issues, user) => {
	return {
		type: 'ISSUES_LOAD_END',
		currentRepo,
		issues,
		user
	};
};

export const fetchIssues = (currentRepo) => {
	return dispatch => {
		dispatch(loadIssues());
		downloadIssues(currentRepo).then(data => {
			dispatch(updateIssues(currentRepo, data.issues, data.user));
		}).catch(err => {
			//dispatch(loadingError(err));
			throw err;
		});
	};
};

const updateIssue = (currentRepo,issueNumber,data) => {
	return {
		type: 'UPDATE_ISSUE_DATA',
		currentRepo,
		issueNumber,
		data
	};
};

export const changeIssueData = (issueNumber,issueData) => {
	return (dispatch, getState) => {
		let currentRepo = getState().currentRepo;
		dispatch(updateIssue(currentRepo,issueNumber,issueData));
		uploadIssueData(currentRepo,issueNumber,issueData).then(data => {
			dispatch(updateIssues(currentRepo, data.issues, data.user));
		}).catch(err => {
			//dispatch(loadingError(err));
			throw err;
		});
	};
};

const updateCurrentRepo = (currentRepo) => {
	return {
		type: 'SET_CURRENTREPO',
		currentRepo
	};
};

export const changeCurrentRepo = (currentRepo) => {
	return (dispatch,getState) => {
		if(getState().repos.currentRepo===currentRepo) {
			return;
		}
		dispatch(updateCurrentRepo(currentRepo));
		dispatch(fetchIssues(currentRepo));
	};
};