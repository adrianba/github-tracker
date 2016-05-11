import React from 'react';
import Issue from './issue.jsx';
import Button from 'react-bootstrap/lib/Button';
import Panel from 'react-bootstrap/lib/Panel';

export default class CategoryList extends React.Component {
	constructor(...args) {
		super(...args);
		this.state = { open:true };
		this.changeCategory = this.changeCategory.bind(this);
		this.updateNotes = this.updateNotes.bind(this);
	}

	render() {
		var category = this.props.category;
		var className = "glyphicon " + (this.state.open ? "glyphicon-minus" : "glyphicon-plus");
		var list = this.props.issues
			.filter(issue => issue.tracker.category===category)
			.map(issue => <Issue key={issue.number} issue={issue}
				onChangeCategory={(category) => this.changeCategory(issue.number,category)}
				onUpdateNotes={(notes) => this.updateNotes(issue.number,notes)}
			/>);
		if(list.length===0) return null;
		var title = <h3>
			<Button bsSize="xsmall" bsStyle="primary" disabled={list.length===0} onClick={ ()=> this.setState({ open: !this.state.open }) } aria-label="Expand">
		        <span className={className}></span>
		    </Button>
			&nbsp;{category} ({list.length})</h3>;

		return (
			<Panel header={title} bsStyle="primary" className={this.state.open ? "show-body" : "hide-body"}>
	          {list}
			</Panel>
		)
	}

	changeCategory(issueNumber,category) {
		if(this.props.onChangeIssueCategory) {
			this.props.onChangeIssueCategory(issueNumber,category);
		}
	}

	updateNotes(issueNumber,notes) {
		if(this.props.onChangeIssueNotes) {
			this.props.onChangeIssueNotes(issueNumber,notes);
		}
	}
};