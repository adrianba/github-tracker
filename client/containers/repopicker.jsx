import { connect } from 'react-redux';
import Picker from '../components/picker.jsx'
import { changeCurrentRepo } from '../actions/issues.jsx';

const mapStateToProps = (state) => ({
	id: 'repopicker',
	current: state.repos.currentRepo,
	options: state.repos.list
});

const mapDispatchToProps = (dispatch, ownProps) => {
	return {
		onSelect: (currentRepo) => {
			dispatch(changeCurrentRepo(currentRepo));
		}
	}
};

export default connect(mapStateToProps,mapDispatchToProps)(Picker);