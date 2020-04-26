import React, { Component } from 'react';
import img1 from './images/img1.jpg';
import img2 from './images/img2.jpg';
import img3 from './images/img3.jpg';
import img4 from './images/img4.jpg';
import img5 from './images/img5.jpg';
import img6 from './images/img6.jpg';
// import button from './ScrollButton';


export class Images extends Component {
    // constructor() {
    //     super();
    //     this.state = {
    //         modalVisible: false
    //     }
    // }

    displayModal = (e) => {
        var modal = document.createElement("div");
        modal.id = "modal";
        document.body.appendChild(modal);

        console.log(e.target); 
        var clickedImg = e.target;
        var img = document.createElement("img");
        img.src = clickedImg.src;
        var caption = document.createElement("p");
        caption.innerHTML = clickedImg.alt;
        
        // modal.innerHTML = "";
        modal.appendChild(img);
        modal.appendChild(caption);
        modal.className = "showmodal";

        modal.addEventListener("click", e => {
            if(e.target != e.currentTarget) {
                return;
            }
            modal.classList.remove("showmodal");
        })
    }




    render() {

        return (
            <div className="image-page">
                <div className="img-container">
                    <div className="img-child">
                        <img src={img1} alt="New York, NY" onClick={this.displayModal} />
                    </div>
                    <div className="img-child">
                        <img src={img2} alt="Santa Barbara, CA" onClick={this.displayModal} />
                    </div>
                    <div className="img-child">
                        <img src={img3} alt="Nikko, Japan" onClick={this.displayModal} />
                    </div>
                    <div className="img-child">
                        <img src={img4} alt="Clarksburg, MD" onClick={this.displayModal} />
                    </div>
                    <div className="img-child">
                        <img src={img5} alt="Taipei, Taiwan" onClick={this.displayModal} />
                    </div>
                    <div className="img-child">
                        <img src={img6} alt="Nikko, Japan" onClick={this.displayModal} />
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
export default Images;