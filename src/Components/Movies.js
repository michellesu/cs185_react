import React, { Component } from 'react';
const axios = require('axios')

const imdbid = ['tt0245429', 'tt0910970', 'tt1375666', 'tt0133093', 
    'tt8946378', 'tt2245084', 'tt4633694', 'tt4846340']
// const imdbid = ['tt0245429', 'tt0910970']

export class Movies extends Component {
    constructor(props) {
        super(props);
        this.state = {
            movie0: '',
            movie1: '',
            movie2: '',
            movie3: '',
            movie4: '',
            movie5: '',
            movie6: '',
            movie7: '',
            movies: '',
            loaded: false
        }

        this.getMovie = this.getMovie.bind(this);

    }
    displayModal = (e) => {
        var modal = document.createElement("div");
        modal.id = "modal";
        document.body.appendChild(modal);

        console.log(e.target); 
        var clickedImg = e.target;
        var img = document.createElement("img");
        img.src = clickedImg.src;
        // var caption = document.createElement("p");
        // caption.innerHTML = clickedImg.alt;
        
        // //modal.innerHTML = "";
        // var movie = document.createElement("div");
        // movie.appendChild(img);

        var movie = document.createElement("div");
        movie.id = "movie-modal";

        var caption = document.createElement("p");
        console.log(document.getElementById("movie-caption"))
        // caption.innerHTML = document.getElementById("movie-caption").textContent;
        // caption.innerHTML = "caption";
        console.log(this.state.movies);
        
        this.state.movies.map((movie, index) => {
            if(movie.Title == clickedImg.alt) {
                var ratings = movie.Ratings;
                caption.innerHTML = "<b>Movie:  </b>"+movie.Title
                +"<br /><b>Director:  </b>"+movie.Director
                +"<br /><b>Ratings: </b><br />";
                ratings.map((rating, index) => {
                    caption.innerHTML += "&emsp;"+rating.Source+": "+rating.Value+"<br />"
                })
            }
        })

        movie.appendChild(img);
        movie.appendChild(caption);
        
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

    async componentDidMount() {
        this.getMovie();
        this.displayMovie();
    }

    // async getMovie() {
    getMovie = async() => {
        // const id = imdbid[0];
        let list = []
        // imdbid.map((value, index) => {
        // items.push(<li key={index}>{value}</li>)
        // /////////////////////////////////////////////////////////////////////
        for (const [index, value] of imdbid.entries()) {
            let id = imdbid[index];
            console.log("id=", id);
            let url = 'http://www.omdbapi.com/?apikey=86818d0d&i='+id;
            try {
                let response = await axios.get(url);
                console.log(response.data); 
                list.push(response.data)
                console.log(list)
                // this.setState({
                //     movies: response
                // }) 
            } catch(error) {
                console.error(error);
            }
        }
        /////////////////////////////////////////////////////////////////////////
        // list = [
        //     { "Title": "WALL\u00b7E" },
        //     { "Title": "Spirited Away" }
        // ]
        // console.log("list = ", list)
        // console.log(list)
        // this.setState({ movies: list }, () => {
        //     console.log("list = ", list)

        //     console.log("this.movies = ", this.movies)

        //     // display movie
        //     // this.movies.map((movie, index) => {
        //     //     return <img src= {movie.Poster} />
        //     // })
        // })
        var movieContainer = document.createElement("div");
        movieContainer.className = "img-container";
        document.body.appendChild(movieContainer);
        list.map((movie, index) => {
            console.log(movie.Title)
            // console.log(movie.Title)
            // const div = new 
            // const img = new Image();
            // img.src = movie.Poster
            // img.alt = movie.Title
            // img.onload = () => {
            //     this.setState.loaded: true
            // }

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
            // var ratings = movie.Ratings;
            // caption.innerHTML = "Director: "+movie.Director
            // +"\nRatings: \n";
            // ratings.map((rating, index) => {
            //     caption.innerHTML += " "+rating.Source+": "+rating.Value+"\n"
            // })
            // img.alt = caption;
            movieContent.appendChild(img);
            // movieContent.appendChild(caption);
        })
        this.setState({
            movies: list,
            loaded: true
        })
        // console.log("this.movies = ", this.movies)
        // console.log(this.movies)


        
    }

    

    displayMovie() {
        // this.movies.map((movie, index) => {
        //     return <img src= {movie.Poster} />
        // })
        // if(this.movies.length > 0) {
        //     // <img src={ this.movies[0]["Poster"]} >
        //     console.log(this.movies[0])
        // }
        // // else
        // console.log("this.movies.length = ", this.movies.length)
    }

    render() {
        // async function getMovie(id) {
        //     // imdbid.map(name => (
        //     //     const url = 'http://www.omdbapi.com/?apikey=86818d0d&i='+name;

        //     // ))
        //     // var id = imdbid[0];
        //     const url = 'http://www.omdbapi.com/?apikey=86818d0d&i='+id;
        //     try {
        //         const response = await axios.get(url);
        //         console.log(response);  
        //     } catch(error) {
        //         console.error(error);
        //     }
        // }

        return (
            <div className="image-page">
                <div className="img-container">
                    <div className="img-child">
                        {/* getMovie(imdbid[0]); */}
                        {/* { this.getMovie() } */}
                        {/* {console.log(this.movies)} */}

                        {/* { this.displayMovie } */}
                        {/* {this.state.loaded?
                            // <img src={this.movies[0]["Poster"]} alt="New York, NY" onClick={this.displayModal} />
                            <img src="https://m.media-amazon.com/images/M/MV5BMjlmZmI5MDctNDE2YS00YWE0LWE5ZWItZDBhYWQ0NTcxNWRhXkEyXkFqcGdeQXVyMTMxODk2OTU@._V1_SX300.jpg" />
                            // console.log(this.movies[0]["Poster"])
                            // console.log(this.movies)
                            : null
                        } */}


                        {/* <img src={this.movies[0]["Poster"]} alt="New York, NY" onClick={this.displayModal} /> */}
                        
                        {/* <img src={img1} alt="New York, NY" onClick={this.displayModal} /> */}
                    </div>
                    <div className="img-child">
                        {/* { getMovie(imdbid[1]) } */}
                        {/* <img src={img2} alt="Santa Barbara, CA" onClick={this.displayModal} /> */}
                    </div>
                    <div className="img-child">
                        {/* getMovie(imdbid[2]); */}
                        {/* <img src={img3} alt="Nikko, Japan" onClick={this.displayModal} /> */}
                    </div>
                    <div className="img-child">
                        {/* getMovie(imdbid[3]); */}
                        {/* <img src={img4} alt="Clarksburg, MD" onClick={this.displayModal} /> */}
                    </div>
                    <div className="img-child">
                        {/* getMovie(imdbid[4]); */}
                        {/* <img src={img5} alt="Taipei, Taiwan" onClick={this.displayModal} /> */}
                    </div>
                    <div className="img-child">
                        {/* getMovie(imdbid[5]); */}
                        {/* <img src={img6} alt="Nikko, Japan" onClick={this.displayModal} /> */}
                    </div>

                </div>

                {/* modal */}
                {/* <button className="backToTopButton" onclick="scrollToTop()">Back to top</button> */}
                {/* {this.state.modalVisible?
                    <div id="modal">
                        Modal
                    </div> : null
                } */}

            </div>
        );
    }
}
export default Movies;