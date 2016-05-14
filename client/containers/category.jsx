import { connect } from 'react-redux';
import IssuesByCategory from '../components/issuesbycategory.jsx'

const mapStateToProps = (state, ownProps) => ({
	category: ownProps.category,
	issues: state.issues.filter(issue => issue.tracker.category===ownProps.category)
});

export default connect(mapStateToProps)(IssuesByCategory);