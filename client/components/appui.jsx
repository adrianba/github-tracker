import React, { PropTypes } from 'react';
import axios from 'axios';
import RepoPicker from '../containers/repopicker.jsx';
import CategoryList from './categorylist.jsx';

const AppUI = (props) => {
	//document.body.className = props.isLoading ? "wait-cursor" : "";
	var list;

	if(props.issues) {
		var categories = ["ready","close","high","medium","low","not set"];
		list = categories.map(c => <CategoryList key={c} category={c}
			issues={props.issues}
		/>);
	} else {
		list = "Loading...";
	}

	var user = props.user ? <small>@{props.user}</small> : [];
	var picker = props.reposLoaded ? <RepoPicker /> : [];

	return <div className="center-block" style={{maxWidth:"1024px"}}>
		<h1>GitHub Issue Tracker {user}</h1>
		{picker}
		<hr/>
		{list}
	</div>;
};

AppUI.PropTypes = {
	reposLoaded: PropTypes.bool.isRequired,
	user: PropTypes.string
};

export default AppUI;