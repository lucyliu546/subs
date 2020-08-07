import React, { Component } from 'react';
import {Nav, Navbar} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';



const NavigationBar = () => {
    return (
      <div>
        <Navbar bg="light" variant="light">
          <Navbar.Brand href="/">BakingSubs</Navbar.Brand>
          <Nav className="mr-auto">
            <Nav.Link href="/">Home</Nav.Link>
            <Nav.Link href="/mypantry">Pantry</Nav.Link>
          </Nav>
        </Navbar>
      </div>
    );
}

export default NavigationBar;