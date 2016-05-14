import React, { PropTypes } from 'react';
import axios from 'axios';
import RepoPicker from '../containers/repopicker.jsx';
import Category from '../containers/category.jsx';

const AppUI = (props) => {
	//document.body.className = props.isLoading ? "wait-cursor" : "";
	var list;

	if(props.issuesLoaded) {
		list = props.categories.map(c => <Category key={c} category={c} />);
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
	user: PropTypes.string,
	categories: PropTypes.arrayOf(PropTypes.string).isRequired
};

export default AppUI;