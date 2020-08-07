import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faGithub} from '@fortawesome/free-brands-svg-icons'


const Footer = () => {
    return (
        <div style={{background: 'url("./background.jpg")'}}>
        <div class="footer" style = {{
            position: 'fixed',
            left: '0',
            bottom: '0',
            width: '100%',
            backgroundColor: 'white',
            opacity: '.8',
            color: 'gray',
            textAlign: 'center',
            padding: '0.5%',
            opactiy: '.9',
            display: 'inline'}}>
          <FontAwesomeIcon icon={faGithub} height= '13px'/>
          <a href="https://github.com/lucyliu546/subs"
            style={{display: 'inline', paddingLeft:'.3%', fontSize: '13px', color: 'gray'}}>View source</a>
        </div>
        </div>
     
    );
}

export default Footer;