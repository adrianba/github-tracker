import React from 'react';

export default ({label}) => {
	var spanStyle = {
		backgroundColor: '#'+label.color,
		marginRight: "10px",
		color:"black"
	};
	return (
		<a href={label.url}><span className="badge" style={spanStyle}>
		  {label.name}
		</span></a>
	);
};