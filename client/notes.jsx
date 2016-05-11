import React from 'react';
import ReactDOM from 'react-dom';
import Button from 'react-bootstrap/lib/Button';
import Well from 'react-bootstrap/lib/Well';
import safeMarkdown from './safe-markdown.jsx';

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
		var notes = this.state.notes;
		var text;
		if(this.state.editing) {
			text = <textarea ref="editor" style={{minHeight:"300px"}} value={notes} className="form-control" onChange={this.handleChange} />
		} else {
			text = <Well bsSize="small" dangerouslySetInnerHTML={safeMarkdown(notes ? notes : "_no notes_")} />
		}

		return (
			<Well bsSize="small">
				<p>
			        <Button bsSize="small" aria-label="Edit" onClick={ this.toggleEditing }>
			          <span className="glyphicon glyphicon-pencil"></span>
			        </Button>
					&nbsp;<strong>Notes</strong>
				</p>
				{text}
			</Well>
		);
	}

	handleChange(event) {
		this.setState({notes:event.target.value});
	}
};