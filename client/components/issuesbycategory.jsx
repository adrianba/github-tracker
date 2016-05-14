import React from 'react';
import Button from 'react-bootstrap/lib/Button';
import Glyphicon from 'react-bootstrap/lib/Glyphicon';
import Panel from 'react-bootstrap/lib/Panel';
import Issue from './issue.jsx';

const ExpandCollapseButton = ({open,onClick}) =>
    <Button bsSize="xsmall" bsStyle="primary" onClick={onClick} aria-label="Expand">
      <Glyphicon glyph={open ? "minus" : "plus"} />
    </Button>;

export default class IssuesByCategory extends React.Component {
	constructor(...args) {
		super(...args);
		this.state = { open:true };
		this.toggleOpen = this.toggleOpen.bind(this);
	}

	render() {
		if(this.props.issues.length===0) return null;
		var list = this.props.issues.map(issue => <Issue key={issue.number} issue={issue} />);
		var title = <h3>
			<ExpandCollapseButton open={this.state.open} onClick={this.toggleOpen} />
			&nbsp;
			{this.props.category} ({list.length})
		</h3>;

		return (
			<Panel header={title} bsStyle="primary" className={this.state.open ? "show-body" : "hide-body"}>
	          {list}
			</Panel>
		)
	}

	toggleOpen() {
		this.setState({ open: !this.state.open });
	}
};