import React from 'react';
import IssueTitle from './issuetitle.jsx';
import Notes from './notes.jsx';
import Collapse from 'react-bootstrap/lib/Collapse';
import Panel from 'react-bootstrap/lib/Panel';
import safeMarkdown from './safe-markdown.jsx';

const LabelBadge = ({label}) => {
	return (
		<a href={label.url}><span className="badge" style={ {backgroundColor: '#'+label.color, marginRight: "10px", color:"black"} }>
		  {label.name}
		</span></a>
	);
};

const LabelList = (labels) =>
	labels.map(function(label) {
		return <LabelBadge key={label.name} label={label} />;
	});

const IssueDetails = (props) =>
	<Collapse in={props.open}>
		<div className="panel panel-default" style={{marginBottom:"10px"}}><div className="panel-body">
			<div>Opened by <a href={props.issue.user.html_url}>@{props.issue.user.login}</a></div>
	    	<div dangerouslySetInnerHTML={safeMarkdown(props.issue.body)} />
	    	<div>{LabelList(props.issue.labels)}</div>
		</div></div>
	</Collapse>;

export default class Issue extends React.Component {
	constructor(...args) {
		super(...args);
		this.state = { open:false };
		this.changeCategory = this.changeCategory.bind(this);
		this.updateNotes = this.updateNotes.bind(this);
		this.toggleOpen = this.toggleOpen.bind(this);
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
		var title = <IssueTitle issue={issue} open={this.state.open}
			onExpandCollapse={this.toggleOpen}
			onChangeCategory={this.changeCategory} />;
		return (
			<Panel header={title} bsStyle="info" style={{marginBottom:"10px"}}>
				<IssueDetails open={this.state.open} issue={issue} />
		        <Notes notes={issue.tracker.notes} onUpdate={this.updateNotes} />
			</Panel>
		)
	}

	toggleOpen() {
		this.setState({ open: !this.state.open });
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