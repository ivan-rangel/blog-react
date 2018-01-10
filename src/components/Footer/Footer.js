import React, { Component } from 'react';
import './Footer.css'


class Footer extends Component {
    render() {
        return (
            <div className="inverse">
                <hr />
                <div className="text-center center-block">
                    <p className="txt-railway">- Geekbears -</p>
                    <br />
                    <a href="https://www.facebook.com/Geekbears/" rel="noopener noreferrer" target="_blank">
                        <i id="social-fb" className="fa fa-facebook-square fa-3x social"></i>                        
                    </a>
                    <a href="https://twitter.com/GeekBears" rel="noopener noreferrer" target="_blank">
                        <i id="social-tw" className="fa fa-twitter-square fa-3x social"></i>                        
                    </a>
                    <a href="https://plus.google.com/+Geekbears" rel="noopener noreferrer" target="_blank">
                        <i id="social-gp" className="fa fa-google-plus-square fa-3x social"></i>                        
                    </a>
                    <a href="mailto:info@geekbears.com">
                        <i id="social-em" className="fa fa-envelope-square fa-3x social"></i>                        
                    </a>
                </div>
                <hr />
            </div>

        );
    }
}

export default Footer;
