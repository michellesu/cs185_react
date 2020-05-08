import React, { Component } from 'react';
import Home from './Home'
import Images from './Images'
import Videos from './Videos'
import Projects from './Projects'
import Guestbook from './Guestbook';



export class Body extends Component {
  	displayContent = () => {
		var activeTab = this.props.activeTab
		if(activeTab == 1)
			return <Home/>
		else if (activeTab == 2)
			return <Images/>
		else if(activeTab == 3)
			return <Videos/>
		else if(activeTab == 4)
			return <Projects/>
		else
			return <Guestbook data={this.props.data} 
			name={this.props.name} 
			description={this.props.description}
			message={this.props.message} 
			privacy={this.props.privacy}
			email={this.props.email} />
  	}

  	render() {
    	return(this.displayContent());
  	}
}
export default Body;
