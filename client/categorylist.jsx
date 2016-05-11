import React from 'react';
import Issue from './issue.jsx';
import Button from 'react-bootstrap/lib/Button';
import Glyphicon from 'react-bootstrap/lib/Glyphicon';
import Panel from 'react-bootstrap/lib/Panel';

const ExpandCollapseButton = ({open,onClick}) =>
    <Button bsSize="xsmall" bsStyle="primary" onClick={onClick} aria-label="Expand">
      <Glyphicon glyph={open ? "minus" : "plus"} />
    </Button>;

export default class CategoryList extends React.Component {
	constructor(...args) {
		super(...args);
		this.state = { open:true };
		this.changeCategory = this.changeCategory.bind(this);
		this.updateNotes = this.updateNotes.bind(this);
		this.toggleOpen = this.toggleOpen.bind(this);
	}

	render() {
		var category = this.props.category;
		var list = this.props.issues
			.filter(issue => issue.tracker.category===category)
			.map(issue => this.renderIssue(issue));
		if(list.length===0) return null;
		var title = <h3>
			<ExpandCollapseButton open={this.state.open} onClick={this.toggleOpen} />
			&nbsp;
			{category} ({list.length})
		</h3>;

		return (
			<Panel header={title} bsStyle="primary" className={this.state.open ? "show-body" : "hide-body"}>
	          {list}
			</Panel>
		)
	}

	renderIssue(issue) {
		return <Issue key={issue.number} issue={issue}
				onChangeCategory={(category) => this.changeCategory(issue.number,category)}
				onUpdateNotes={(notes) => this.updateNotes(issue.number,notes)}
			/>;
	}

	toggleOpen() {
		this.setState({ open: !this.state.open });
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