import { downloadRepos } from '../lib/api.jsx';
import { fetchIssues } from './issues.jsx';

const loadRepos = () => {
	return {
		type: 'REPOS_LOAD_START'
	};
};

const updateRepos = (repos, user, currentRepo) => {
	return {
		type: 'REPOS_LOAD_END',
		repos,
		user,
		currentRepo
	};
};

export const fetchRepos = () => {
	return dispatch => {
		dispatch(loadRepos());
		downloadRepos().then(data => {
			let currentRepo = (data.repos && data.repos.length>0) ? data.repos[0] : undefined;
			dispatch(updateRepos(data.repos, data.user, currentRepo));
			if(currentRepo) {
				dispatch(fetchIssues(currentRepo));
			}
		}).catch(err => {
			//dispatch(loadingError(err));
			throw err;
		});
	};
};