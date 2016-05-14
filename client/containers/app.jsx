import { connect } from 'react-redux';
import AppUI from '../components/appui.jsx'

const mapStateToProps = (state) => ({
    issuesLoaded: state.issues.list ? true : false,
    reposLoaded: state.repos.list ? true : false,
    categories: state.categories,
    user: state.user.user,
    isLoading: state.repos.isFetchingRepos || state.issues.isFetchingIssues
});

export default connect(mapStateToProps)(AppUI);