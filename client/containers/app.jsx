import { connect } from 'react-redux';
import AppUI from '../components/appui.jsx'

const mapStateToProps = (state) => ({
    reposLoaded: state.repolist ? true : false,
    user: state.user,
    issues: state.issues,
    isLoading: state.isFetchingRepos || state.isFetchingIssues
});

export default connect(mapStateToProps)(AppUI);