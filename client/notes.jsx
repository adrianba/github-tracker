var React = require('react');
var ReactDOM = require('react-dom');
var Button = require('react-bootstrap/lib/Button');
var Well = require('react-bootstrap/lib/Well');
var marked = require('marked');

var Notes = React.createClass({
	getInitialState: function() {
		return {editing:false,notes:this.props.notes};
	},
	rawMarkdown: function(md) {
		var rawMarkup = marked(md, {sanitize: true});
		return { __html: rawMarkup };
	},
	toggleEditing: function() {
		if(this.state.editing && this.props.onUpdate) {
			var notes = this.state.notes;
			if(notes!==this.props.notes) {
				this.props.onUpdate(notes);
			}
		}
		this.setState({ editing: !this.state.editing });
	},
	componentDidUpdate: function() {
		if(this.refs.editor) {
	      	ReactDOM.findDOMNode(this.refs.editor).focus(); 
		}
	},
	render: function() {
		var notes = this.state.notes;
		var text;
		if(this.state.editing) {
			text = <textarea ref="editor" style={{minHeight:"300px"}} value={notes} className="form-control" onChange={this.handleChange} />
		} else {
			text = <Well bsSize="small" dangerouslySetInnerHTML={this.rawMarkdown(notes ? notes : "_no notes_")} />
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
	},
	handleChange: function(event) {
		this.setState({notes:event.target.value});
	}
});

module.exports = Notes;