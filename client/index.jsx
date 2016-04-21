var React = require('react');
var ReactDOM = require('react-dom');
var CategoryList = require('./categorylist.jsx');
var axios = require('axios');
axios.defaults.headers.post['Content-Type'] = 'application/json';

var TheApp = React.createClass({
	getInitialState: function() {
		return {data:null};
	},
	componentDidMount: function() {
		this.downloadIssues();
	},
	render: function(){
		if(this.state.data) {
			var categories = ["ready","close","high","medium","low","not set"];
			var list = categories.map(c => <CategoryList key={c} category={c}
				issues={this.state.data.issues}
				onChangeIssueCategory={this.changeIssueCategory}
				onChangeIssueNotes={this.changeIssueNotes}
			/>);
			return <div className="center-block" style={{maxWidth:"1024px"}}><h1>GitHub Issue Tracker</h1><hr/>{list}</div>;
		} else {
			return (
				<div>
				Loading...
				</div>
			)
		}
	},
	downloadIssues: function() {
		axios.get("/issues").then(response => {
			this.setState({data:response.data});
		});
	},
	setIssueState: function(issueNumber,data) {
		document.body.className = "wait-cursor";
		axios.post("/issues/" + issueNumber,data).then(response => {
			this.setState({data:response.data});
			document.body.className = "";
		});
	},
	changeIssueCategory: function(issueNumber,category) {
		this.setIssueState(issueNumber, {category:category});
	},
	changeIssueNotes: function(issueNumber,notes) {
		this.setIssueState(issueNumber, {notes:notes});
	}
});
ReactDOM.render(<TheApp />, document.getElementById('app'));
