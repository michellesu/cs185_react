import React, { Component } from 'react';
import Dropdown from 'react-bootstrap/Dropdown'
import config from '../config'
// get a reference to firebase
const firebase = require('firebase');
const axios = require('axios')

export class AddMovies extends Component {
    constructor(props) {
        super(props);
        this.state = {
            imdbid: '',
            submitted: ''
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
            imdbid: e.target.value
        });
        // }, this.retrieveMovie);

        // let val = e.target.value;
        console.log(this.state.imdbid)
    }

    async handleSubmit(e) {
    // handleSubmit(e) {
        e.preventDefault();

        // check char length requirements: name
        if(this.state.imdbid.length < 1) {
            alert("Error: ID must be at least 1 character")
            return;
        }

        // tt0133093
        
        // get reference to firebase database "data" category
        let movieref = firebase.database().ref("movies")

        
        console.log("this.state.imdbid!!!! = ")
        console.log(this.state.imdbid)
        
        let moviedata;
        let url = 'https://www.omdbapi.com/?apikey=86818d0d&i='+this.state.imdbid;
        let id = this.state.imdbid;
        console.log("url = ")
        console.log(url)
        try {
            let response = await axios.get(url);
            // let response = axios.get(url);
            moviedata = response.data; 
        } catch(error) {
            console.error(error);
            return;
        }
        console.log(moviedata);
        
        
        if(moviedata.Response == 'False'){
            alert(moviedata.Error);
            return;
        }
        else {
            let exists = false;
            let goneThroughFor = false;
            // add inputs to database
            const i = {
                imdbid: this.state.imdbid,
                moviedata: moviedata
            }

            let count = 0;
            // check if movie already in database
            movieref.on('value', snapshot => {
                // alert(snapshot);

                let items = snapshot.val();
                for (let item in items) {
                    // console.log(this.state.imdbid);
                    console.log(id);
                    count += 1;

                    // check if imdbid entered is alrady in firebase
                    if(items[item].imdbid == id) {
                        
                        exists = true;
                        // set state to default values again
                        this.setState({
                            imdbid: ''
                        })
                        
                        // break;
                        return;
                    }

                }
            })
            console.log(exists);

            if(!exists && count > 0) {
                // console.log('in if')
                alert('Movie added!')
                movieref.push(i);
            }
            else {
                alert("Movie already exists");
            }

            // set state to default values again
            this.setState({
                imdbid: ''
            })
        }
        
    }


    render() {

        return (
            <div className="addmovies-page">
                <div className="form">
                    <form className="form-body" 
                    // onSubmit = { this.handleSubmit } 
                    >
                        <h3>Add a movie</h3>
                        <h4>
                            <label>
                                &ensp; <b style={{color: "grey"}}>Enter the IMDb ID </b> <br /> 
                                &ensp; <input type="text" name="imdbid" 
                                // placeholder="Name"
                                minLength="2"
                                maxLength="19"
                                onChange={this.handleChange}
                                value={this.state.imdbid}
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
export default AddMovies;