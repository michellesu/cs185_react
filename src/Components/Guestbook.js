import React, { Component } from 'react';
import config from '../config'
// get a reference to firebase
const firebase = require('firebase');

export class Guestbook extends Component {

    constructor(props) {
        super(props);
        this.state = {
            name: '',
            description: '',
            message: '',
            private: 'select',
            email: '',
            time: '',
            // data: '',
            items: [],
        }

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(e) {
        this.setState({
            [e.target.name]: e.target.value
        });
        // console.log(this.state.name)
        // console.log(this.state.description)
        // console.log(this.state.message)
        // console.log(this.state.email)
        // console.log(this.state.private)
        // console.log(e)
        // console.log(e.target.name)
        // console.log(e.target.value)

    }

    handleSubmit(e) {
        e.preventDefault();

        // check char length requirements: name
        if(this.state.name.length < 6) {
            alert("Error: Name must be greater than 5 characters")
            return;
        }
        if(this.state.name.length > 19) {
            alert("Error: Name must be less than 20 characters")
            return;
        }

        // check char length requirements: description
        if(this.state.message.length > 99) {
            alert("Error: Message must be less than 100 characters")
            return;
        }
        
        // check char length requirements: message
        if(this.state.message.length < 16) {
            alert("Error: Message must be greater than 15 characters")
            return;
        }
        if(this.state.message.length > 499) {
            alert("Error: Message must be less than 500 characters")
            return;
        }

        // check privacy requirement is selected
        if(this.state.private == 'select') {
            alert("Error: Please indicate if you would like your message to be public or private")
            return;
        }
        

        // get reference to firebase database "data" category
        let dataref = firebase.database().ref("data")
        
        // add inputs to database
        const item = {
            name: this.state.name,
            description: this.state.description,
            message: this.state.message,
            private: this.state.private,
            email: this.state.email,
            time: firebase.database.ServerValue.TIMESTAMP
        }
        dataref.push(item);
        
        // set state to default values again
        this.setState({
            name: '',
            description: '',
            message: '',
            email: '',
            private: 'select',
            time: ''
        })
    }


    componentDidMount(){
        if (!firebase.apps.length) {
			firebase.initializeApp(config)
		}

		// get a reference to the database
		let ref = firebase.database().ref("data")
		// retrieve its data
		ref.on('value', snapshot => {
            let items = snapshot.val();
            let newState = [];
            for (let item in items) {
                
                // check if post is public, only want to display public messages
                if(items[item].private == "no") {
                    
                    // convert firebase timestamp to readable time for display
                    const timestamp = items[item].time
                    console.log(timestamp)
                    const convertedTimestamp = new Intl.DateTimeFormat('en-US', 
                    {year: 'numeric', month: '2-digit',day: '2-digit', 
                    hour: '2-digit', minute: '2-digit', second: '2-digit'}).format(timestamp)
                    
                    // add post with all its info to the list
                    newState.push({
                        id: item,
                        name: items[item].name,
                        description: items[item].description,
                        message: items[item].message,
                        private: items[item].private,
                        email: items[item].email,
                        time: convertedTimestamp
                    })
                }
            }

            // set items to be the compiled list of posts
            this.setState({
                items: newState
            })
		})
    }

    render() {

    	return(

            <div className="guestbook-body">
                <div className="form">
                    <form className="form-body" 
                    // onSubmit = { this.handleSubmit } 
                    >
                        <h3>Leave a message below!</h3>
                        <p>
                            <label>
                                <b style={{color: "red"}}>*</b><b>Name </b> <br /> 
                                &ensp; <input type="text" name="name" 
                                // placeholder="Name"
                                minLength="6"
                                maxLength="19"
                                onChange={this.handleChange}
                                value={this.state.name}
                                style={{width: "50%", height:"35px"}} />
                            </label>
                        </p>
                        <p>
                            <label>
                                <b>A short description about yourself</b> <br/>
                                &ensp; <textarea rows = "3" name="description" 
                                // placeholder="A short description about yourself"
                                maxLength="99"
                                onChange={this.handleChange}
                                value={this.state.description}
                                style={{minWidth: "90%", maxWidth:"90%", minHeight:"25px", maxHeight:"150px"}}>
                                </textarea>
                            </label>
                        </p>
                        <p>
                            <label>
                                <b style={{color: "red"}}>*</b><b>Message</b> <br/>
                                &ensp; <textarea rows = "4" name="message" 
                                // placeholder="Your message"
                                minLength="16"
                                maxLength="499"
                                onChange={this.handleChange}
                                value={this.state.message}
                                style={{minWidth: "90%", maxWidth:"90%", minHeight:"25px", maxHeight:"150px"}}>
                                </textarea>
                            </label>
                        </p>
                        <p>
                            <label>
                                <b style={{color: "red"}}>*</b><b>Would you like your message to be private? </b><br/>
                                &ensp;
                                
                                <select name='private' 
                                value={this.state.private} 
                                onChange={this.handleChange} 
                                >
                                    <option value="select">Select</option>
                                    <option value="yes">Yes</option>
                                    <option value="no">No</option>
                                </select>
                                <br />
                            </label>
                        </p>
                        <p>
                            <label>
                                <b>Email</b> <br/>
                                &ensp; <input type="text" name="email"
                                //  placeholder="Email" 
                                onChange={this.handleChange}
                                value={this.state.email}
                                style={{width: "50%", height:"35px"}} /> 
                            </label>
                        </p>

                        <button className="submit-button" onClick={ this.handleSubmit } >
                            <b>Submit</b>
                        </button>

                        {/* <input className="submit-button" type="submit" value="Submit" /> */}
                    </form>
                    
                </div>

                <div className="posts">
                    <h2><b>Posts</b></h2>
                        {this.state.items.reverse().map((item) => {
                            return (
                                <div className="post" key={item.id}>
                                    <div className="post-content"> 
                                        <p className="post-time"><b>{item.time}</b></p>
                                        <p> <b>{item.name}</b></p>


                                        {item.description.length>0?
                                        <p className="post-description"> {item.description}</p> : null
                                        }

                                        <p> &ensp; {item.message}</p>
                                    </div>
                                </div>
                            )
                        })}
                </div>
            </div>
            
        );
  	}
}
export default Guestbook;
