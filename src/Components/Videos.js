import React, { Component } from 'react';
import vid1 from './videos/vid1.mp4';
import vid2 from './videos/vid2.mp4';
import vid3 from './videos/vid3.mp4';
import vid4 from './videos/vid4.mp4';


export class Videos extends Component {
    
    displayModal = (e) => {
        e.preventDefault();
        
        var modal = document.createElement("div");
        modal.id = "modal";
        document.body.appendChild(modal);
        
        // console.log(e.target); 
        var clickedVid = e.target;
        var vid = document.createElement("video");
        vid.id = "videopreview";
        vid.src = clickedVid.src;
        vid.autoplay = "autoplay";
        vid.controls = "controls";

        // modal.innerHTML = "";
        modal.appendChild(vid);
        modal.className = "showmodal";

        modal.addEventListener("click", e => {
            if(e.target != e.currentTarget) {
                return;
            }
            // stop modal video from playing in the background after exiting modal
            // var vid = document.getElementById("videopreview");
            // vid.src = "";
            modal.innerHTML = "";
            modal.classList.remove("showmodal");
        })
    }

    
    
    render() {
        return (
            <div className="videos-page">
                <div className="video-container">
                    <div className="img-child">
                        <video src={vid1} controls onClick={this.displayModal} ></video>
                    </div>
                    <div className="img-child">
                        <video src={vid2} controls onClick={this.displayModal} ></video>
                    </div>
                    <div className="img-child">
                        <video src={vid3} controls onClick={this.displayModal} ></video>
                    </div>
                    <div className="img-child">
                        <video src={vid4} controls onClick={this.displayModal} ></video>
                    </div>
                </div>
            </div>
        )
    }
}
export default Videos;