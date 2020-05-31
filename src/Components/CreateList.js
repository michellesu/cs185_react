import React, { Component } from 'react';
// import Dropdown from 'react-bootstrap/Dropdown'
import config from '../config'
// get a reference to firebase
const firebase = require('firebase');
const axios = require('axios')

export class CreateList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            listName: ''
        }

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount(){
        if (!firebase.apps.length) {
            firebase.initializeApp(config)
        }
    }

    handleChange(e) {
        this.setState({
            // [e.target.name]: e.target.value
            listName: e.target.value
        });

        console.log(this.state.listName)
    }

    handleSubmit(e) {
        e.preventDefault();

        // check char length requirements: name
        if(this.state.listName.length < 1) {
            alert("Error: List name must be at least 1 character")
            return;
        }

        // alert(this.state.listName);
        alert(this.state.listName + " created!");
        console.log(this.state.listName);


        // get reference to firebase database "data" category
        let listref = firebase.database().ref("movielists")

        // add inputs to database
        const item = {
            name: this.state.listName,
            movies: ['-1']
        }
        listref.push(item);
        
        // set state to default values again
        this.setState({
            listName: ''
        })
    }

    render() {
        return (
            <div className="createlist-page">
               <div className="form">
                    <form className="form-body" 
                    // onSubmit = { this.handleSubmit } 
                    >
                        <h3>Add a movie list</h3>
                        <h4>
                            <label>
                                &ensp; <b style={{color: "grey"}}>Enter new movie list name </b> <br /> 
                                &ensp; <input type="text" name="listName" 
                                // placeholder="Name"
                                minLength="1"
                                onChange={this.handleChange}
                                value={this.state.listName}
                                style={{width: "50%", height:"35px"}} />
                            </label>
                        </h4>

                        <button className="submit-button" onClick={ this.handleSubmit } >
                            <b>Submit</b>
                        </button>

                        {/* <input className="submit-button" type="submit" value="Submit" /> */}
                    </form>
                    
                </div>
            </div>
        );
    }
}
export default CreateList;