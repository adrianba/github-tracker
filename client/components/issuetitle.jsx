import React from 'react';
import Button from 'react-bootstrap/lib/Button';
import Glyphicon from 'react-bootstrap/lib/Glyphicon';
import CategoryPicker from '../containers/categorypicker.jsx';

const PullRequestIcon = () => 
	<svg xmlns="http://www.w3.org/2000/svg" style={{verticalAlign:"text-bottom"}} aria-hidden="true" viewBox="0 0 12 16" height="20" width="15" version="1.1"><path d="M 11 11.28 c 0 -1.73 0 -6.28 0 -6.28 c -0.03 -0.78 -0.34 -1.47 -0.94 -2.06 s -1.28 -0.91 -2.06 -0.94 c 0 0 -1.02 0 -1 0 V 0 L 4 3 l 3 3 V 4 h 1 c 0.27 0.02 0.48 0.11 0.69 0.31 s 0.3 0.42 0.31 0.69 v 6.28 c -0.59 0.34 -1 0.98 -1 1.72 c 0 1.11 0.89 2 2 2 s 2 -0.89 2 -2 c 0 -0.73 -0.41 -1.38 -1 -1.72 Z m -1 2.92 c -0.66 0 -1.2 -0.55 -1.2 -1.2 s 0.55 -1.2 1.2 -1.2 s 1.2 0.55 1.2 1.2 s -0.55 1.2 -1.2 1.2 Z M 4 3 c 0 -1.11 -0.89 -2 -2 -2 S 0 1.89 0 3 c 0 0.73 0.41 1.38 1 1.72 c 0 1.55 0 5.56 0 6.56 c -0.59 0.34 -1 0.98 -1 1.72 c 0 1.11 0.89 2 2 2 s 2 -0.89 2 -2 c 0 -0.73 -0.41 -1.38 -1 -1.72 V 4.72 c 0.59 -0.34 1 -0.98 1 -1.72 Z m -0.8 10 c 0 0.66 -0.55 1.2 -1.2 1.2 s -1.2 -0.55 -1.2 -1.2 s 0.55 -1.2 1.2 -1.2 s 1.2 0.55 1.2 1.2 Z m -1.2 -8.8 c -0.66 0 -1.2 -0.55 -1.2 -1.2 s 0.55 -1.2 1.2 -1.2 s 1.2 0.55 1.2 1.2 s -0.55 1.2 -1.2 1.2 Z" /></svg>;

const IssueDiscussionIcon = () =>
	<svg xmlns="http://www.w3.org/2000/svg" style={{verticalAlign:"text-bottom"}} aria-hidden="true" viewBox="0 0 14 16" height="20" width="17.5" version="1.1"><path d="M 7 2.3 c 3.14 0 5.7 2.56 5.7 5.7 S 10.14 13.7 7 13.7 S 1.3 11.14 1.3 8 s 2.56 -5.7 5.7 -5.7 m 0 -1.3 C 3.14 1 0 4.14 0 8 s 3.14 7 7 7 s 7 -3.14 7 -7 S 10.86 1 7 1 Z m 1 3 H 6 v 5 h 2 V 4 Z m 0 6 H 6 v 2 h 2 V 10 Z" /></svg>;

const IssueIcon = ({isPullRequest}) =>
	isPullRequest ? <span title="Pull Request"><PullRequestIcon /></span> : <span title="Issue"><IssueDiscussionIcon /></span>;

const CommentBadge = ({commentCount,url}) =>
	<a href={url}>
		<span className="badge" style={{verticalAlign:"text-bottom"}} title={commentCount + (commentCount===1 ? " comment" : " comments")}>
			{commentCount} <Glyphicon glyph="comment" />
		</span>
	</a>;

const ExpandCollapseButton = ({open,onClick}) =>
    <Button bsSize="small" onClick={onClick} aria-label="Expand">
      <Glyphicon glyph={open ? "minus" : "plus"} />
    </Button>;

const IssueTitleText = ({issue}) =>
	<span>
		<a name={issue.number} />
		<IssueIcon isPullRequest={issue.pull_request} />
		&nbsp;&nbsp;
		<a href={issue.html_url}>#{issue.number}</a> - <strong>{issue.title}</strong>
		&nbsp;&nbsp;
		<CommentBadge commentCount={issue.comments} url={issue.html_url} />
    </span>;

const IssueTitle = ({issue,open,onExpandCollapse,onChangeCategory}) =>
	<div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
		<IssueTitleText issue={issue} />
		<span style={{minWidth:"120px",textAlign:"right"}}>
			<ExpandCollapseButton open={open} onClick={onExpandCollapse} />
	        &nbsp;
	        <CategoryPicker id={issue.number} category={issue.tracker.category} />
	    </span>
	</div>;

export default IssueTitle;