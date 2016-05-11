import React from 'react';
import DropdownButton from 'react-bootstrap/lib/DropdownButton';
import MenuItem from 'react-bootstrap/lib/MenuItem';

export default class RepoPicker extends React.Component {
	constructor(...args) {
		super(...args);
		this.state = { currentRepo: this.props.currentRepo };
		this.updateRepo = this.updateRepo.bind(this);
	}

	render() {
		var options = this.props.repos.map(i => <MenuItem key={i} eventKey={i} active={i===this.state.currentRepo}>{i}</MenuItem>);
		return (
			<DropdownButton bsSize="small" title={this.state.currentRepo} id='{this.props.id}' onSelect={this.updateRepo}>{options}</DropdownButton>
		);
	}

	updateRepo(currentRepo) {
		if(this.state.currentRepo!==currentRepo) {
			this.setState({currentRepo});
			if(this.props.onPick) {
				this.props.onPick(currentRepo);
			}
		}
	}
};