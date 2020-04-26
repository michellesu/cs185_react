import React, { Component } from 'react';
import githubLogo from './images/githubLogo.svg';
import linkedinLogo from './images/linkedinLogo.png';
import propic from './images/bodyimg.jpeg';



export class Home extends Component {
    render() {
        return (
            <div className="Home-page">
            {/* <div className="Home-main" style={{backgroundColor:'black'}}> */}
                {/* <Helmet>
                    <style>{'body { background-color: red; }'}</style>
                </Helmet> */}



                <div className="header">
                    <h1>Michelle Su</h1>
                    <p>University of California, Santa Barbara</p>
                    <p>Computer Science B.S.</p>
                    <p>Class of 2020</p>
                    <div className="links">
                        <p className="links-paragraph">
                            <a href="https://github.com/michellesu">
                                <img src={githubLogo} alt="Github"/>
                            </a>
                            <a href="https://www.linkedin.com/in/michellepysu/">
                                <img src={linkedinLogo} alt="LinkedIn" />
                            </a>
                        </p>
                    </div>
                </div>

                <div className="home-body">
			        <img src={propic} alt="" />
                    
                    <p>
                    Hello! My name is Michelle, and I am a 4th year CS major at UCSB, 
                    expected to graduate in the spring. Originally a physics major, I later
                    switched tracks to CS after finding a passion in coding and doing something
                    creative with it. After graduation, I will be starting my first job as a 
                    back-end engineer at IBM San Jose.
                    </p>
                </div>
            </div>
            
        )
    }
}
export default Home;