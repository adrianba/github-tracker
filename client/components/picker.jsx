import React, { PropTypes } from 'react';
import DropdownButton from 'react-bootstrap/lib/DropdownButton';
import MenuItem from 'react-bootstrap/lib/MenuItem';

const Picker = ({id,current,options,onSelect}) => {
	var list = options.map(i => <MenuItem key={i} eventKey={i} active={i===current}>{i}</MenuItem>);
	return <DropdownButton bsSize="small" title={current} id={id} onSelect={onSelect}>{list}</DropdownButton>
};

Picker.PropTypes = {
	id: PropTypes.string.isRequired,
	current: PropTypes.string.isRequired,
	options: PropTypes.arrayOf(PropTypes.string).isRequired,
	onSelect: PropTypes.func.isRequired
};

export default Picker;