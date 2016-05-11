import React from 'react';

export default ({label}) => {
	return (
		<a href={label.url}><span className="badge" style={ {backgroundColor: '#'+label.color, marginRight: "10px", color:"black"} }>
		  {label.name}
		</span></a>
	);
};