import { connect } from 'react-redux';
import AppUI from '../components/appui.jsx'

const mapStateToProps = (state) => ({
    issuesLoaded: state.issues ? true : false,
    reposLoaded: state.repolist ? true : false,
    categories: state.categories,
    user: state.user,
    isLoading: state.isFetchingRepos || state.isFetchingIssues
});

export default connect(mapStateToProps)(AppUI);