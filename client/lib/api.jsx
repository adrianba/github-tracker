import axios from 'axios';
axios.defaults.headers.post['Content-Type'] = 'application/json';

export const downloadRepos = () => {
	return axios.get("/repos"+"?"+Date.now().toString())
		.then(response => response.data)
		.catch(err => { throw err; });
};

export const downloadIssues = (currentRepo) => {
	return axios.get("/issues/"+currentRepo+"?"+Date.now().toString())
		.then(response => response.data)
		.catch(err => { throw err; });
};

export const uploadIssueData = (currentRepo,issueNumber,issueData) => {
	return axios.post("/issues/" + currentRepo + "/" + issueNumber+"?"+Date.now().toString(),issueData)
		.then(response => response.data)
		.catch(err => { throw err; });
};