import React from 'react';
import axios from 'axios';
import RepoPicker from './repopicker.jsx';
import CategoryList from './categorylist.jsx';

const AppUI = (props) => {
	//document.body.className = props.isLoading ? "wait-cursor" : "";
	var list;

	if(props.issues) {
		var categories = ["ready","close","high","medium","low","not set"];
		list = categories.map(c => <CategoryList key={c} category={c}
			issues={props.issues}
			onChangeIssueCategory={props.onChangeIssueCategory}
			onChangeIssueNotes={props.onChangeIssueNotes}
		/>);
	} else {
		list = "Loading...";
	}

	var user = props.user ? <small>@{props.user}</small> : [];
	var picker = props.repos ? <RepoPicker id="repopicker" repos={props.repos} currentRepo={props.currentRepo} onPick={props.onPickRepo} /> : [];

	return <div className="center-block" style={{maxWidth:"1024px"}}>
		<h1>GitHub Issue Tracker {user}</h1>
		{picker}
		<hr/>
		{list}
	</div>;
};

export default AppUI;