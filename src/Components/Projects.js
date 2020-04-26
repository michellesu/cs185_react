import React, { Component } from 'react';
import shopmystyle from './images/shopmystyle.png';
import map from './images/mapofthings.png';


export class Projects extends Component {
    render() {
        return (
            <div className="projects-page">
                <div className="project-container">
                    <div className="project">
                        <div className="project-img">
                            <a href="https://shop-my-style.herokuapp.com/">
                                <img src={shopmystyle} alt=""/>
                            </a>
                        </div>
                        <div className="project-blurb">
                            <div className="title">
                                <b>Shop My Style</b>
                            </div>
                            <div className="description">
                                Web app that allows users to share and browse other people's outfits
                            </div>
                        </div>
                    </div>

                    <div className="project">
                        <div className="project-img">
                            <a href="https://github.com/michellesu/facemap">
                                <img src={map} alt=""/>
                            </a>
                        </div>
                        <div className="project-blurb">
                            <div className="title">
                                <b>Map of Things</b>
                            </div>
                            <div className="description">
                                Find the most frequently occuring object from photographs of 
                                the 50 states using machine learning algorithm
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
export default Projects;