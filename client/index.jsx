var React = require('react');
var ReactDOM = require('react-dom');
var RepoPicker = require('./repopicker.jsx');
var CategoryList = require('./categorylist.jsx');
var axios = require('axios');
axios.defaults.headers.post['Content-Type'] = 'application/json';

var TheApp = React.createClass({
	getInitialState: function() {
		return {repos:null,issues:null,user:"",currentRepo:"w3c/browser-payment-api"};
	},
	componentDidMount: function() {
		this.downloadRepos().then(()=>{
			this.downloadIssues(this.state.currentRepo);
		});
	},
	render: function(){
		var list;
		if(this.state.issues) {
			var categories = ["ready","close","high","medium","low","not set"];
			list = categories.map(c => <CategoryList key={c} category={c}
				issues={this.state.issues}
				onChangeIssueCategory={this.changeIssueCategory}
				onChangeIssueNotes={this.changeIssueNotes}
			/>);
		} else {
			list = "Loading...";
		}
		var user = this.state.user ? <small>@{this.state.user}</small> : [];
		var picker = this.state.repos ? <RepoPicker id="repopicker" repos={this.state.repos} currentRepo={this.state.currentRepo} onPick={this.pickRepo} /> : [];
		return <div className="center-block" style={{maxWidth:"1024px"}}>
			<h1>GitHub Issue Tracker {user}</h1>
			{picker}
			<hr/>
			{list}
		</div>
	},
	pickRepo: function(currentRepo) {
		this.setState({currentRepo,issues:null});
		this.downloadIssues(currentRepo);
	},
	downloadRepos: function() {
		return axios.get("/repos").then(response => {
			this.setState({repos:response.data.repos, user:response.data.user});
		});
	},
	downloadIssues: function(currentRepo) {
		axios.get("/issues/"+currentRepo).then(response => {
			this.setState({issues:response.data.issues, user:response.data.user});
		});
	},
	setIssueState: function(issueNumber,data) {
		document.body.className = "wait-cursor";
		axios.post("/issues/" + this.state.currentRepo + "/" + issueNumber,data).then(response => {
			this.setState({issues:response.data.issues, user:response.data.user});
			document.body.className = "";
		});
	},
	changeIssueCategory: function(issueNumber,category) {
		this.setIssueState(issueNumber, {category});
	},
	changeIssueNotes: function(issueNumber,notes) {
		this.setIssueState(issueNumber, {notes});
	}
});
ReactDOM.render(<TheApp />, document.getElementById('app'));
