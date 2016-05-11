import React from 'react';
import Label from './label.jsx';
import IssueTitle from './issuetitle.jsx';
import CategoryPicker from './categorypicker.jsx';
import Notes from './notes.jsx';
import Button from 'react-bootstrap/lib/Button';
import Glyphicon from 'react-bootstrap/lib/Glyphicon';
import Collapse from 'react-bootstrap/lib/Collapse';
import safeMarkdown from './safe-markdown.jsx';
import Panel from 'react-bootstrap/lib/Panel';

export default class Issue extends React.Component {
	constructor(...args) {
		super(...args);
		this.state = { open:false };
		this.changeCategory = this.changeCategory.bind(this);
		this.updateNotes = this.updateNotes.bind(this);
	}

	shouldComponentUpdate(nextProps, nextState) {
		var oldIssue = this.props.issue;
		var newIssue = nextProps.issue;

		return this.state.open !== nextState.open
			|| oldIssue.number !== newIssue.number
			|| oldIssue.tracker.category !== newIssue.tracker.category
			|| oldIssue.tracker.notes !== newIssue.tracker.notes
			|| oldIssue.title !== newIssue.title
			|| oldIssue.body !== newIssue.body
			|| oldIssue.html_url !== newIssue.html_url
			|| oldIssue.pull_request !== newIssue.pull_request
			|| oldIssue.comments !== newIssue.comments
			|| oldIssue.labels.length !== newIssue.labels.length;
	}

	render() {
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
	}

	changeCategory(category) {
		if(this.props.onChangeCategory) {
			this.props.onChangeCategory(category);
		}
	}

	updateNotes(notes) {
		if(this.props.onUpdateNotes) {
			this.props.onUpdateNotes(notes);
		}
	}
};