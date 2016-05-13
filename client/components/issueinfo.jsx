import React from 'react';
import Collapse from 'react-bootstrap/lib/Collapse';
import Panel from 'react-bootstrap/lib/Panel';
import Notes from '../notes.jsx';
import safeMarkdown from '../lib/safe-markdown.jsx';

const LabelBadge = ({label}) => {
	return (
		<a href={label.url}><span className="badge" style={ {backgroundColor: '#'+label.color, marginRight: "10px", color:"black"} }>
		  {label.name}
		</span></a>
	);
};

const LabelList = (labels) => labels.map(label => <LabelBadge key={label.name} label={label} />);

const IssueDetails = (props) =>
	<Collapse in={props.open}>
		<div className="panel panel-default" style={{marginBottom:"10px"}}><div className="panel-body">
			<div>Opened by <a href={props.issue.user.html_url}>@{props.issue.user.login}</a></div>
	    	<div dangerouslySetInnerHTML={safeMarkdown(props.issue.body)} />
	    	<div>{LabelList(props.issue.labels)}</div>
		</div></div>
	</Collapse>;

export default ({issue,open,children,onUpdateNotes}) =>
	<Panel header={children} bsStyle="info" style={{marginBottom:"10px"}}>
		<IssueDetails open={open} issue={issue} />
        <Notes notes={issue.tracker.notes} onUpdate={onUpdateNotes} />
	</Panel>;