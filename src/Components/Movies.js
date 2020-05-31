import React, { Component } from 'react';
import Dropdown from 'react-bootstrap/Dropdown'
import DropdownButton from 'react-bootstrap/DropdownButton'
// import MenuItem from 'react-bootstrap/MenuItem'
import config from '../config'
// get a reference to firebase
const firebase = require('firebase');
const axios = require('axios')

// const imdbid = ['tt0245429', 'tt0910970', 'tt1375666', 'tt0133093', 
//     'tt8946378', 'tt2245084', 'tt4633694', 'tt4846340']
const imdbid = ['tt0245429', 'tt0910970', 'tt1375666', 'tt0133093']

export class Movies extends Component {
    constructor(props) {
        super(props);
        this.state = {
            lists: [],
            search: '',
            select: 'select',
            display: 'select',
            list: '',
            title: '',
        }

        var s = '';
        // var list = '';
        // var title = '';
        // const lists = [];
        // global.lists = [];

        this.getMovie = this.getMovie.bind(this);
        this.handleSearchChange = this.handleSearchChange.bind(this);
        this.handleSelectChange = this.handleSelectChange.bind(this);
        this.handleDisplayChange = this.handleDisplayChange.bind(this);
        this.searchMovie = this.searchMovie.bind(this);
        // this.handleSubmit = this.handleSubmit.bind(this);
        this.deleteMovie = this.deleteMovie.bind(this);
        // this.displayModal = this.displayModal.bind(this);
        this.displayList = this.displayList.bind(this);
        this.addToList = this.addToList.bind(this);
    }

    componentDidMount() {
        
        if (!firebase.apps.length) {
            firebase.initializeApp(config)
        }
        
        // get a reference to the database
        let listref = firebase.database().ref("movielists");
        // retrieve its data
        console.log(this.lists);
        

        let newState = [];
		listref.on('value', snapshot => {
            let items = snapshot.val();
            for (let item in items) {
                newState.push(items[item].name);

                // this.lists.push(items[item].name);
                // console.log(this.lists);
            }
        // }, this.getLists());
        })
        console.log(newState);
        // set items to be the compiled list of posts
        this.setState({
            lists: newState
        // }, () => {this.getLists()} );
        });
        // newState = [];

        console.log(this.lists);

        if(document.getElementsByClassName('list-container')[0] == null){
            console.log(document.getElementsByClassName('list-container')[0])
            console.log("document.getElementsByClassName('list-container')[0]")

        // **************************************
        var listContainer = document.createElement("div");
        listContainer.className = "list-container";
        document.body.appendChild(listContainer);

        let description = document.createElement('p');
        description.innerHTML = "<b>Select list to display: </b> <br />";
        listContainer.appendChild(description);

        
        // let listref = firebase.database().ref("movielists");
        listref.on('value', snapshot => {
            let items = snapshot.val();
            
            let listbut = document.createElement('select');
            listbut.value= this.state.display;
            listbut.onchange = this.handleDisplayChange;
            listbut.className= 'list-button';

            let option = document.createElement('option');
            option.value = 'select';
            option.innerHTML = 'Select';
            listbut.appendChild(option)

            for (let item in items) {
                option = document.createElement('option');
                option.value = items[item].name;
                option.innerHTML = items[item].name;
                listbut.appendChild(option);

            }
            listContainer.appendChild(listbut);
        })
        // ***************************************
        }




        // global.lists = this.newState;
        // console.log(this.state.lists);

        
        // this.getLists();
        this.getMovie();

    }

    displayModal = (e) => {
        var modal = document.createElement("div");
        modal.id = "modal";
        document.body.appendChild(modal);

        console.log(e.target); 
        var clickedImg = e.target;
        var img = document.createElement("img");
        img.src = clickedImg.src;
        img.id = 'modal-img';
        img.alt = clickedImg.alt;

        var movie = document.createElement("div");
        movie.id = "movie-modal";

        var caption = document.createElement("p");
        console.log(document.getElementById("movie-caption"))
        // console.log(this.state.movies);

        // delete movie button
        var deletebut = document.createElement('button');
        deletebut.className = 'delete-button';
        deletebut.innerHTML = 'Delete';
        deletebut.onclick = this.deleteMovie;

        // add to list button
        // create div to display lists
        var listContainer = document.createElement("div");
        listContainer.className = "list-container";
        document.body.appendChild(listContainer);

        let description = document.createElement('p');
        description.innerHTML = "<b>Add to list: </b> <br />";
        listContainer.appendChild(description);

        
        let listref = firebase.database().ref("movielists");
        listref.on('value', snapshot => {
            let items = snapshot.val();
            
            let listbut = document.createElement('select');
            listbut.value= this.state.select;
            listbut.onchange = this.handleSelectChange;
            listbut.className= 'list-button';

            let option = document.createElement('option');
            option.value = 'select';
            option.innerHTML = 'Select';
            listbut.appendChild(option)

            for (let item in items) {
            //     // console.log(items[item])
            //     // console.log(items[item].name)
                option = document.createElement('option');
                option.value = items[item].name;
                option.innerHTML = items[item].name;
                listbut.appendChild(option);

                // *********************
                // listcontent.onclick = () => this.addToList(listcontent.innerHTML, img.alt);

            }
            listContainer.appendChild(listbut);
        })
        
        // movie info in modal
        let movieref = firebase.database().ref("movies");
        movieref.on('value', snapshot => {
            let items = snapshot.val();
            for (let item in items) {
                let movie = items[item].moviedata;
                console.log("in modal: ")
                console.log(items[item]);
                console.log(items[item].moviedata);
                console.log(items[item].moviedata.Title);
                if (movie.Title == clickedImg.alt) {
                    var ratings = items[item].moviedata.Ratings;
                    caption.innerHTML = "<b>Movie:  </b>"+movie.Title
                    +"<br /><b>Director:  </b>"+movie.Director
                    +"<br /><b>Ratings: </b><br />";
                    ratings.map((rating, index) => {
                        caption.innerHTML += "&emsp;"+rating.Source+": "+rating.Value+"<br />"
                    })
                }
            }
        })

        movie.appendChild(img);
        movie.appendChild(caption);
        movie.appendChild(listContainer);
        movie.appendChild(deletebut);
        
        modal.appendChild(movie);
        modal.className = "showmodal-movie";
        document.body.classList.add("modal-open");

        modal.addEventListener("click", e => {
            if(e.target != e.currentTarget) {
                return;
            }
            modal.classList.remove("showmodal-movie");
            document.body.classList.remove("modal-open");
        })
    }

    handleSelectChange(e) {
        let img = document.getElementById('modal-img');
        this.setState({
            select: e.target.value,
            title: img.alt,
            list: e.target.value
        }, () => { this.addToList() } )
        // return (() => this.addToList(e.target.value, img.alt));
        // this.addToList(e.target.value, img.alt);

    }

    handleDisplayChange(e) {
        // alert("handle display change")
        this.setState({
            display: e.target.value
        }, () => { this.displayList() } )
    }

    addToList(e) {
        // alert('add to list = ' + this.state.list + ', movie = ' + this.state.title);

        // get key of the movie
        let key = '';
        let movieref = firebase.database().ref("movies");
        movieref.on('value', snapshot => {
            let items = snapshot.val();
            for (let item in items) {
                // if(items[item].moviedata.Title == title) {
                if(items[item].moviedata.Title == this.state.title) {
                    key = item;
                }
            }
        })
        console.log("key = ", key);

        let listref = firebase.database().ref("movielists");

        let thing;

        listref.on('value', snapshot2 => {
            let things = snapshot2.val();
            for (thing in things) {
                if(things[thing].name == this.state.list) {
                    break;
                }
            }

        })

        // alert('pushing');
        let mref = firebase.database().ref('movielists/'+thing+'/movies');
        mref.push(key);

        this.setState({
            select: 'select',
            list: '',
            title: '',
        })

        // dynamically delete modal
        let modal = document.getElementById('modal');
        modal.classList.remove("showmodal-movie");
        document.body.classList.remove("modal-open");
        // **************delete modal*********
        document.body.removeChild(modal);
        
        window.location.reload();

    }

    // display movies in a list
    // displayList(listName) {
    displayList() {
        // alert("list clicked!!! "+this.state.display);

        let movies = [];

        let listref = firebase.database().ref("movielists");
        listref.on('value', snapshot => {
            let items = snapshot.val();
            for (let item in items) {
                if(this.state.display == items[item].name) {
                    let list = items[item].movies;
                    for (let m in list) {
                        // console.log(items[item].movies[m]);
                        movies.push(items[item].movies[m]);
                    }
                }

                // var ratings = items[item].moviedata.Ratings;
                // ratings.map((rating, index) => {
                //     caption.innerHTML += "&emsp;"+rating.Source+": "+rating.Value+"<br />"
                // })
            }
        })

        console.log(movies);
        // movies.map((item, i) => {
        //     item.id
        // }
        let displayed = []
        let add = true;

        // dynamically remove movies that were dynamically added
        var toremoveContainer = document.getElementsByClassName('img-container');
        // if(document.body.hasChildNodes){
        if(toremoveContainer[0] != null) {
            document.body.removeChild(toremoveContainer[0]);
        }
        // create movie container
        var movieContainer = document.createElement("div");
        movieContainer.className = "img-container";
        document.body.appendChild(movieContainer);

        movies.map((i) => {
            // console.log(i);
            let movieref = firebase.database().ref("movies");
            movieref.on('value', snapshot2 => {
                let things = snapshot2.val();
                for( let thing in things) {
                    if(thing == i){
                        // alert("match")
                        
                        
                        let movie = things[thing].moviedata;
                        // displayed.map((d) => {
                        //     if(d == movie.imdbid) {
                        //         add = false;
                        //         break;
                        //     }
                        // })
                        // **********************************
                        displayed.push(things[thing].imdbid);

                        var movieContent = document.createElement("div");
                        movieContent.className = "img-child";
                        // document.body.appendChild(movieContent);
                        movieContainer.appendChild(movieContent);
                        var img = document.createElement("img");
                        img.src = movie.Poster;
                        img.alt = movie.Title;
                        img.onclick = this.displayModal;
                        var caption = document.createElement("p");
                        caption.id = "movie-caption";
                        movieContent.appendChild(img);
                        // **********************************
                    }
                }
            })
            
        })

        

    }


    handleSearchChange(e) {
        this.setState({
            search: e.target.value
        })

        this.s = e.target.value;

        console.log(this.s);
        // console.log(this.state.search);
    }

    searchMovie(e) {
        e.preventDefault();

        // alert('search movie!!!');

        // dynamically remove movies that were dynamically added
        var toremoveContainer = document.getElementsByClassName('img-container');
        // if(document.body.hasChildNodes){
        if(toremoveContainer[0] != null) {
            document.body.removeChild(toremoveContainer[0]);
        }
        
        let movieref = firebase.database().ref("movies");
        movieref.on('value', snapshot => {
            let items = snapshot.val();
            for (let item in items) {
                let movie = items[item].moviedata;
                // if(movie.Title == this.s) {
                if(movie.Title.toLowerCase() == this.state.search.toLowerCase()) {

                    // create movie container
                    var movieContainer = document.createElement("div");
                    movieContainer.className = "img-container";
                    document.body.appendChild(movieContainer);
                    

                    var movieContent = document.createElement("div");
                    movieContent.className = "img-child";
                    // document.body.appendChild(movieContent);
                    movieContainer.appendChild(movieContent);
                    var img = document.createElement("img");
                    img.src = movie.Poster;
                    img.alt = movie.Title;
                    img.onclick = this.displayModal;
                    var caption = document.createElement("p");
                    caption.id = "movie-caption";
                    movieContent.appendChild(img);
                }
            }
        })

        this.s = '';
    }

    // async getMovie() {
    // getMovie = async() => {
    getMovie() {
        
        // create movie container
        var movieContainer = document.createElement("div");
        movieContainer.className = "img-container";
        document.body.appendChild(movieContainer);

        let listref = firebase.database().ref("movies");
        listref.on('value', snapshot => {
            let items = snapshot.val();
            for (let item in items) {

                console.log(items[item])
                console.log(items[item].moviedata)
                let movie = items[item].moviedata

                var movieContent = document.createElement("div");
                movieContent.className = "img-child";
                // document.body.appendChild(movieContent);
                movieContainer.appendChild(movieContent);
                var img = document.createElement("img");
                img.src = movie.Poster;
                img.alt = movie.Title;
                img.onclick = this.displayModal;
                var caption = document.createElement("p");
                caption.id = "movie-caption";
                movieContent.appendChild(img);

            }
        })
    }

    deleteMovie() {
        // dynamically remove movies that were dynamically added
        var toremoveContainer = document.getElementsByClassName('img-container');
        document.body.removeChild(toremoveContainer[0]);

        let modal = document.getElementById('modal');
        // **************************************
        

        let movieref = firebase.database().ref("movies");
        movieref.on('value', snapshot => {
            let items = snapshot.val();
            for (let item in items) {
                console.log("document.getElementById('modal-img').alt = ");
                console.log(document.getElementById('modal-img').alt);
                console.log(items[item].moviedata.Title);

                if (items[item].moviedata.Title == document.getElementById('modal-img').alt) {
                    console.log(item);
                    movieref.child(item).remove();
                }
            }
        })

        // **************************************
        modal.classList.remove("showmodal-movie");
        document.body.classList.remove("modal-open");

        // **************delete modal*********
        document.body.removeChild(modal);


        // this.getMovie();



        // create movie container
        var movieContainer = document.createElement("div");
        movieContainer.className = "img-container";
        document.body.appendChild(movieContainer);

        let listref = firebase.database().ref("movies");
        listref.on('value', snapshot => {
            let items = snapshot.val();
            for (let item in items) {

                console.log(items[item])
                console.log(items[item].moviedata)
                let movie = items[item].moviedata

                var movieContent = document.createElement("div");
                movieContent.className = "img-child";
                // document.body.appendChild(movieContent);
                movieContainer.appendChild(movieContent);
                var img = document.createElement("img");
                img.src = movie.Poster;
                img.alt = movie.Title;
                img.onclick = this.displayModal;
                var caption = document.createElement("p");
                caption.id = "movie-caption";
                movieContent.appendChild(img);

            }
        })
        
        window.location.reload();
    }

    componentWillUnmount() {
        this.setState({
            movies: ''
        })
        
        // dynamically remove movies that were dynamically added
        var toremoveContainer = document.getElementsByClassName('img-container');
        if(toremoveContainer[0] != null){
            document.body.removeChild(toremoveContainer[0]);
        }
        // dynamically remove lists that were dynamically added
        // var toremoveContainer2 = document.getElementsByClassName('list-container');
        // if(toremoveContainer2[0] != null){
        //     document.body.removeChild(toremoveContainer2[0]);
        // }
    }


    render() {
        // console.log(this.state.lists)
        return (
            <div className="image-page">
                
                {/* <select 
                // name='private' 
                // value={this.state.private} 
                // onChange={this.handleChange}
                className='list-button' 
                >
                    <option 
                    value={this.state.display} 
                    onChange={ this.handleDisplayChange }
                    onchange={ this.handleDisplayChange }
                    className=''
                    > Choose Movie List </option>
                    {this.state.lists.map(i => 
                        {
                        // console.log(i);
                        return (
                            <option className='' 
                            value= { this.state.display }
                            onChange= { this.handleDisplayChange }
                            onchange= { this.handleDisplayChange }
                            // onClick= { () => {this.displayList(i)} } 
                            > {i}
                            </option>
                        )
                    })
                }
                </select> */}
                {/* <option className='' onClick= { this.displayList(i) } > {i} */}
                <br />

                {/* <Dropdown>
                <Dropdown.Toggle className='list-button' variant="success" id="dropdown-basic">
                    Choose Movie List
                </Dropdown.Toggle>
                <Dropdown.Menu className='dropdown'>
                    {this.state.lists.map(i => 
                        {
                        // console.log(i);
                        return (
                            <Dropdown.Item href='' className='dropdown-item' onClick= { () => {this.displayList(i)} } > {i}<br/> 
                            </Dropdown.Item>
                        )
                    })}
                </Dropdown.Menu>
                </Dropdown> */}
                
                <div className="searchform">
                    <form className="searchform-body" 
                    // onSubmit = { this.handleSubmit } 
                    >
                        {/* <h3>Search movie</h3> */}
                        <h3>
                            <label>
                                <b>Search movie </b> <br /> 
                                &ensp; <input type="text" name="imdbid" 
                                onChange={this.handleSearchChange}
                                value={this.s}
                                style={{width: "70%", height:"35px"}} />
                            </label>
                        </h3>

                        <button className="submit-button" onClick={ this.searchMovie } >
                            <b>Search</b>
                        </button>

                        {/* <input className="submit-button" type="submit" value="Submit" /> */}
                    </form>
                </div>
                
                <div className='list-container'> 
                    <b>Select list to display:</b> <br />
                    <select 
                    // value= 'select'
                    value= { this.state.display }
                    onchange= { this.handleDisplayChange }
                    onChange= { this.handleDisplayChange }
                    className='list-button'
                    >
                        <option className=''
                        // value= { this.state.display }
                        value='select'
                        onChange= { this.handleDisplayChange }
                        onchange= { this.handleDisplayChange }
                        >Select movie list</option>
                    {this.state.lists.map(i => 
                        {
                        // console.log(i);
                        return (
                            <option className='' 
                            // value= { this.state.display }
                            value={i}
                            onChange= { this.handleDisplayChange }
                            onchange= { this.handleDisplayChange }
                            // onClick= { () => {this.displayList(i)} } 
                            > {i}
                            </option>
                        )
                    })
                    }
                    </select>
                </div>
            </div>

        );
    }
}
export default Movies;