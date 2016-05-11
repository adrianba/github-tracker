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

const LabelList = (labels) =>
	labels.map(function(label) {
		return <Label key={label.name} label={label} />;
	});

const IssueDetails = (props) =>
	<Collapse in={props.open}>
		<div className="panel panel-default" style={{marginBottom:"10px"}}><div className="panel-body">
			<div>Opened by <a href={props.issue.user.html_url}>@{props.issue.user.login}</a></div>
	    	<div dangerouslySetInnerHTML={safeMarkdown(props.issue.body)} />
	    	<div>{LabelList(props.issue.labels)}</div>
		</div></div>
	</Collapse>;

const ExpandCollapseButton = (props) =>
    <Button bsSize="small" onClick={props.onClick} aria-label="Expand">
      <Glyphicon glyph={props.open ? "minus" : "plus"} />
    </Button>;


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
		var title = <h3 style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
			<IssueTitle issue={issue} />
			<span style={{minWidth:"120px",textAlign:"right"}}>
				<ExpandCollapseButton open={this.state.open} onClick={ ()=> this.setState({ open: !this.state.open })} />
		        &nbsp;
		        <CategoryPicker id={issue.number} category={issue.tracker.category} onPick={this.changeCategory} />
	        </span>
		</h3>;
		return (
			<Panel header={title} bsStyle="info" style={{marginBottom:"10px"}}>
				<IssueDetails open={this.state.open} issue={issue} />
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