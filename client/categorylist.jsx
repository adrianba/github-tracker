var React = require('react');
var Issue = require('./issue.jsx');
var Button = require('react-bootstrap/lib/Button');
var Panel = require('react-bootstrap/lib/Panel');

var CategoryList = React.createClass({
	getInitialState: function() {
		return {open:true};
	},
	render: function() {
		var category = this.props.category;
		var className = "glyphicon " + (this.state.open ? "glyphicon-minus" : "glyphicon-plus");
		var list = this.props.issues
			.filter(issue => issue.tracker.category===category)
			.map(issue => <Issue key={issue.number} issue={issue}
				onChangeCategory={(category) => this.changeCategory(issue.number,category)}
				onUpdateNotes={(notes) => this.updateNotes(issue.number,notes)}
			/>);
		var listStyle = { display: this.state.open ? "block" : "none"};
		var title = <h3>
			<Button bsSize="xsmall" bsStyle="primary" disabled={list.length===0} onClick={ ()=> this.setState({ open: !this.state.open }) } aria-label="Expand">
		        <span className={className}></span>
		    </Button>
			&nbsp;{category} ({list.length})</h3>;

		return (
			<Panel header={title} bsStyle="primary">
	          <div style={listStyle}>{list}</div>
			</Panel>
		)
	},
	changeCategory: function(issueNumber,category) {
		if(this.props.onChangeIssueCategory) {
			this.props.onChangeIssueCategory(issueNumber,category);
		}
	},
	updateNotes: function(issueNumber,notes) {
		if(this.props.onChangeIssueNotes) {
			this.props.onChangeIssueNotes(issueNumber,notes);
		}
	}

});

module.exports = CategoryList;