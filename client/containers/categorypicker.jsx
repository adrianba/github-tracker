import { connect } from 'react-redux';
import Picker from '../components/picker.jsx'
import { changeIssueData } from '../actions/issues.jsx';

const mapStateToProps = (state, ownProps) => ({
	id: 'category' + ownProps.id,
	current: ownProps.category,
	options: state.categories
});

const mapDispatchToProps = (dispatch, ownProps) => {
	return {
		onSelect: (category) => {
			if(category!==ownProps.category) {
				dispatch(changeIssueData(ownProps.id,{category}));
			}
		}
	}
};

export default connect(mapStateToProps,mapDispatchToProps)(Picker);