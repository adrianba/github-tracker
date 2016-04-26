var React = require('react');
var Label = require('./label.jsx');
var IssueTitle = require('./issuetitle.jsx');
var CategoryPicker = require('./categorypicker.jsx');
var Notes = require('./notes.jsx');
var Button = require('react-bootstrap/lib/Button');
var Glyphicon = require('react-bootstrap/lib/Glyphicon');
var Collapse = require('react-bootstrap/lib/Collapse');
var safeMarkdown = require('./safe-markdown.jsx');
var Panel = require('react-bootstrap/lib/Panel');

var Issue = React.createClass({
	getInitialState: function() {
		return {open:false};
	},
	shouldComponentUpdate: function(nextProps, nextState) {
		var oldIssue = this.props.issue;
		var newIssue = nextProps.issue;

		return this.state.open !== nextState.open
			|| oldIssue.number !== newIssue.number
			|| oldIssue.tracker.category !== newIssue.tracker.category
			|| oldIssue.tracker.notes !== newIssue.tracker.category
			|| oldIssue.title !== newIssue.title
			|| oldIssue.body !== newIssue.body
			|| oldIssue.html_url !== newIssue.html_url
			|| oldIssue.pull_request !== newIssue.pull_request
			|| oldIssue.comments !== newIssue.comments
			|| oldIssue.labels.length !== newIssue.labels.length;
	},
	render: function() {
		var issue = this.props.issue;
		var labels = issue.labels.map(function(label) {
			return <Label key={label.name} label={label} />;
		});
		var title = <h3 style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
			<IssueTitle issue={issue} />
			<span style={{minWidth:"120px",textAlign:"right"}}>
		        <Button bsSize="small" onClick={ ()=> this.setState({ open: !this.state.open })} aria-label="Expand">
		          <Glyphicon glyph={this.state.open ? "minus" : "plus"} />
		        </Button>
		        &nbsp;<CategoryPicker id={issue.number} category={issue.tracker.category} onPick={this.changeCategory} />
	        </span>
		</h3>;
		return (
			<Panel header={title} bsStyle="info" style={{marginBottom:"10px"}}>
		        <Collapse in={this.state.open}>
					<div className="panel panel-default" style={{marginBottom:"10px"}}><div className="panel-body">
						<div>Opened by <a href={issue.user.html_url}>@{issue.user.login}</a></div>
		            	<div dangerouslySetInnerHTML={safeMarkdown(issue.body)} />
		            	<div>{labels}</div>
	            	</div></div>
		        </Collapse>
		        <Notes notes={issue.tracker.notes} onUpdate={this.updateNotes} />
			</Panel>
		)
	},
	changeCategory: function(category) {
		if(this.props.onChangeCategory) {
			this.props.onChangeCategory(category);
		}
	},
	updateNotes: function(notes) {
		if(this.props.onUpdateNotes) {
			this.props.onUpdateNotes(notes);
		}
	}
});

module.exports = Issue;