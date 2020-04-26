import React, { Component } from 'react';
import Tab from './Tab'

export class TabList extends Component {

  	render() {
		/* this.props.tabs - gets the "tabs" const from app.js
			map - loops over tabs
			
			props: used to pass objects to child component
			state: refers to component state
		*/
		return this.props.tabs.map((indTab) => (
			<Tab tab = {indTab}
			changeTab={this.props.changeTab}
			activeTab={this.props.activeTab} /> 
		));
  	}
}

export default TabList;
