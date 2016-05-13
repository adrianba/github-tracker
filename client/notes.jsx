import React from 'react';
import ReactDOM from 'react-dom';
import Button from 'react-bootstrap/lib/Button';
import Well from 'react-bootstrap/lib/Well';
import safeMarkdown from './lib/safe-markdown.jsx';

const EditButton = ({onClick}) =>
	<p>
        <Button bsSize="small" aria-label="Edit" onClick={onClick}>
          <span className="glyphicon glyphicon-pencil"></span>
        </Button>
		&nbsp;
		<strong>Notes</strong>
	</p>;

const ReadNotes = ({notes}) =>
	<Well bsSize="small" dangerouslySetInnerHTML={safeMarkdown(notes ? notes : "_no notes_")} />;

export default class Notes extends React.Component {
	constructor(...args) {
		super(...args);
		this.state = { editing:false, notes:this.props.notes };
		this.toggleEditing = this.toggleEditing.bind(this);
		this.handleChange = this.handleChange.bind(this);
	}

	toggleEditing() {
		if(this.state.editing && this.props.onUpdate) {
			var notes = this.state.notes;
			if(notes!==this.props.notes) {
				this.props.onUpdate(notes);
			}
		}
		this.setState({ editing: !this.state.editing });
	}

	componentDidUpdate() {
		if(this.refs.editor) {
	      	ReactDOM.findDOMNode(this.refs.editor).focus(); 
		}
	}

	render() {
		var text = this.state.editing
			? <textarea ref="editor" style={{minHeight:"300px"}} value={this.state.notes} className="form-control" onChange={this.handleChange} />
			: <ReadNotes notes={this.state.notes} />;
		return <Well bsSize="small"><EditButton onClick={this.toggleEditing} /> {text}</Well>;
	}

	handleChange(event) {
		this.setState({notes:event.target.value});
	}
};