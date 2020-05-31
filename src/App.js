import React, { Component } from 'react';
import './App.css'
import Body from './Components/Body'
import TabList from './Components/TabList'

export class App extends Component {
  	constructor(props) {
		super(props);
		this.state = {
			// specify id of first active tab, can also do - activeTab: 'Home'
			activeTab: 1,
			displayButton: false,
			scrollPosition: 0
		}

		this.changeTab = (id) => {
			this.setState({
				activeTab: id
			})
		}
  	}

	// for scroll button
	handleScroll = (event) => {
		// console.log(window.pageYOffset);
		this.setState({
			scrollPosition: window.pageYOffset
		}, this.checkScroll)
  	}

  	checkScroll = () => {
    	if(this.state.scrollPosition > 100){
			this.setState({
				displayButton:true
			})
		}
		else {
			this.setState({
				displayButton: false
			})
    	}
  	}

  	scrollToTop = () => {
		window.scrollTo({
			top: 0,
			behavior: "smooth"
    	});
	  }

	render() {
		const tabs = [
		{
			id: 1,
			title: 'Home'
		},
		{
			id: 2,
			title: 'Around the World'
		},
		{
			id: 3,
			title: 'Videos'
		},
		{
			id: 4,
			title: 'Projects'
		},
		{
			id: 5,
			title: 'Guest Book'
		},
		{
			id: 6,
			title: 'Movies'
		},
		{
			id: 7,
			title: 'Add Movie'
		},
		{
			id: 8,
			title: 'Create Movie List'
		}
		]

		window.addEventListener('scroll', this.handleScroll)
		return (
		<div className="body">
			<div className="nav-bar">
				<TabList tabs = {tabs} 
				changeTab={this.changeTab} 
				activeTab={this.state.activeTab}/>
			</div>

			<div className="main-body">
				<Body activeTab={this.state.activeTab}
				displayButton={this.state.displayButton} />
				{/* conditional statement to display back to top button or not */}
				{/* {this.state.displayButton?
				<button className="backToTopButton" onClick={this.scrollToTop} >
					Back To Top
				</button> : null
				} */}
			</div>
		</div>
		);
    
  	}
}

export default App;
