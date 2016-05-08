var React = require('react');
var DropdownButton = require('react-bootstrap/lib/DropdownButton');
var MenuItem = require('react-bootstrap/lib/MenuItem');

var CategoryPicker = React.createClass({
	getInitialState: function() {
		return {category:this.props.category};
	},
	shouldComponentUpdate: function(nextProps, nextState) {
		return this.props.id !== nextProps.id
			|| this.props.category !== nextProps.category;
	},
	render: function() {
		var category = this.state.category;
		var categories = ["not set","ready","close","high","medium","low"];
		var options = categories.map(i => <MenuItem key={i} eventKey={i} active={i===category}>{i}</MenuItem>);
		return (
			<DropdownButton bsSize="small" title={category} id={'category'+this.props.id} onSelect={this.updateCategory}>{options}</DropdownButton>
		);
	},
	updateCategory: function(category) {
		if(this.state.category!==category) {
			this.setState({category});
			if(this.props.onPick) {
				this.props.onPick(category);
			}
		}
	}
});

module.exports = CategoryPicker;