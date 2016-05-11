import React from 'react';
import ReactDOM from 'react-dom';
import RepoPicker from './repopicker.jsx';
import CategoryList from './categorylist.jsx';
import axios from 'axios';
//import Perf from 'react-addons-perf';
//window.Perf = Perf;
axios.defaults.headers.post['Content-Type'] = 'application/json';

class TheApp extends React.Component {
	constructor(...args) {
		super(...args);
		this.state = { repos:null,issues:null,user:"",currentRepo:"w3c/browser-payment-api" };
		this.pickRepo = this.pickRepo.bind(this);
		this.downloadRepos = this.downloadRepos.bind(this);
		this.downloadIssues = this.downloadIssues.bind(this);
		this.setIssueState = this.setIssueState.bind(this);
		this.changeIssueCategory = this.changeIssueCategory.bind(this);
		this.changeIssueNotes = this.changeIssueNotes.bind(this);
	}

	componentDidMount() {
		this.downloadRepos().then(()=>{
			this.downloadIssues(this.state.currentRepo);
		});
	}

	render() {
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
	}

	pickRepo(currentRepo) {
		this.setState({currentRepo,issues:null});
		this.downloadIssues(currentRepo);
	}

	downloadRepos() {
		return axios.get("/repos"+"?"+Date.now().toString()).then(response => {
			this.setState({repos:response.data.repos, user:response.data.user});
		});
	}

	downloadIssues(currentRepo) {
		axios.get("/issues/"+currentRepo+"?"+Date.now().toString()).then(response => {
			this.setState({issues:response.data.issues, user:response.data.user});
		});
	}

	setIssueState(issueNumber,data) {
		document.body.className = "wait-cursor";
		axios.post("/issues/" + this.state.currentRepo + "/" + issueNumber+"?"+Date.now().toString(),data).then(response => {
			this.setState({issues:response.data.issues, user:response.data.user});
			document.body.className = "";
		});
	}

	changeIssueCategory(issueNumber,category) {
		this.setIssueState(issueNumber, {category});
	}

	changeIssueNotes(issueNumber,notes) {
		this.setIssueState(issueNumber, {notes});
	}
};

ReactDOM.render(<TheApp />, document.getElementById('app'));