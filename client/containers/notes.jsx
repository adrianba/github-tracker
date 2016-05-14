import { connect } from 'react-redux';
import NotesEditor from '../components/noteseditor.jsx'
import { changeIssueData } from '../actions/issues.jsx';

const mapStateToProps = (state, ownProps) => ({
	id: ownProps.id,
	notes: ownProps.notes
});

const mapDispatchToProps = (dispatch, ownProps) => {
	return {
		onUpdate: (notes) => {
			dispatch(changeIssueData(ownProps.id,{notes}));
		}
	}
};

export default connect(mapStateToProps,mapDispatchToProps)(NotesEditor);