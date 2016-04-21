var React = require('react');

var Label = React.createClass({
	render: function() {
		var label = this.props.label;
		var spanStyle = {
			backgroundColor: '#'+label.color,
			marginRight: "10px",
			color:"black"
		};
		return (
			<a href={label.url}><span className="badge" style={spanStyle}>
			  {label.name}
			</span></a>
		)
	}
});

module.exports = Label;