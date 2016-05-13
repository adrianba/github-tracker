import { connect } from 'react-redux';
import AppUI from '../components/appui.jsx'
import { changeIssueData, changeCurrentRepo } from '../actions/issues.jsx';

const mapStateToProps = (state) => ({
    repos: state.repolist,
    user: state.user,
    currentRepo: state.currentRepo,
    issues: state.issues,
    isLoading: state.isFetchingRepos || state.isFetchingIssues
});

const mapDispatchToProps = (dispatch) => {
	return {
		onChangeIssueCategory: (issueNumber,category) => {
			dispatch(changeIssueData(issueNumber,{category}));
		},
		onChangeIssueNotes: (issueNumber,notes) => {
			dispatch(changeIssueData(issueNumber,{notes}));	
		},
		onPickRepo: (currentRepo) => {
			dispatch(changeCurrentRepo(currentRepo));
		}
	}
}

const TheApp = connect(mapStateToProps,mapDispatchToProps)(AppUI);

export default TheApp;