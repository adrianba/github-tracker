import React from 'react';
import IssueTitle from './issuetitle.jsx';
import IssueInfo from './issueinfo.jsx';

export default class Issue extends React.Component {
	constructor(...args) {
		super(...args);
		this.state = { open:false };
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
		return (
			<IssueInfo issue={this.props.issue} open={this.state.open}>
				<IssueTitle issue={this.props.issue} open={this.state.open} onExpandCollapse={this.toggleOpen} />
			</IssueInfo>
		);
	}

	toggleOpen() {
		this.setState({ open: !this.state.open });
	}
};