import React from 'react';
import DropdownButton from 'react-bootstrap/lib/DropdownButton';
import MenuItem from 'react-bootstrap/lib/MenuItem';

export default class CategoryPicker extends React.Component {
	constructor(...args) {
		super(...args);
		this.state = { category:this.props.category };
		this.updateCategory = this.updateCategory.bind(this);
	}

	shouldComponentUpdate(nextProps, nextState) {
		return this.props.id !== nextProps.id
			|| this.props.category !== nextProps.category;
	}

	render() {
		var category = this.state.category;
		var categories = ["not set","ready","close","high","medium","low"];
		var options = categories.map(i => <MenuItem key={i} eventKey={i} active={i===category}>{i}</MenuItem>);
		return (
			<DropdownButton bsSize="small" title={category} id={'category'+this.props.id} onSelect={this.updateCategory}>{options}</DropdownButton>
		);
	}

	updateCategory(category) {
		if(this.state.category!==category) {
			this.setState({category});
			if(this.props.onPick) {
				this.props.onPick(category);
			}
		}
	}
};