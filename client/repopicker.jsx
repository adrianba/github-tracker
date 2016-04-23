var React = require('react');
var DropdownButton = require('react-bootstrap/lib/DropdownButton');
var MenuItem = require('react-bootstrap/lib/MenuItem');

var RepoPicker = React.createClass({
	getInitialState: function() {
		return {currentRepo:this.props.currentRepo};
	},
	render: function() {
		var options = this.props.repos.map(i => <MenuItem key={i} eventKey={i} active={i===this.state.currentRepo}>{i}</MenuItem>);
		return (
			<DropdownButton bsSize="small" title={this.state.currentRepo} id='{this.props.id}' onSelect={this.updateRepo}>{options}</DropdownButton>
		);
	},
	updateRepo: function(currentRepo) {
		if(this.state.currentRepo!==currentRepo) {
			this.setState({currentRepo});
			if(this.props.onPick) {
				this.props.onPick(currentRepo);
			}
		}
	}
});

module.exports = RepoPicker;