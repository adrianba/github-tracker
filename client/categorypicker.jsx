var React = require('react');
var DropdownButton = require('react-bootstrap/lib/DropdownButton');
var MenuItem = require('react-bootstrap/lib/MenuItem');

var CategoryPicker = React.createClass({
	getInitialState: function() {
		return {category:this.props.category};
	},
	render: function() {
		var category = this.state.category;
		var categories = ["not set","ready","close","high","medium","low"];
		var options = categories.map(i => <MenuItem key={i} eventKey={i} active={i===category}>{i}</MenuItem>);
		return (
			<DropdownButton bsSize="small" title={category} id={'category'+this.props.id} onSelect={(key)=>this.updateCategory(key)}>{options}</DropdownButton>
		);
	},
	updateCategory: function(key) {
		this.setState({category:key});
		if(this.props.onPick) {
			this.props.onPick(key);
		}
	}
});

module.exports = CategoryPicker;