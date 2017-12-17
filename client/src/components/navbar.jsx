import React from 'react';
import {Navbar, Nav, NavItem} from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import './navbar.css';

const NavHeader = () => {
  return <Navbar inverse collapseOnSelect>
    <Navbar.Header>
      <LinkContainer to='/'>
        <Navbar.Brand>
          Predictor
        </Navbar.Brand>
      </LinkContainer>
      <Navbar.Toggle />
    </Navbar.Header>
    <Navbar.Collapse>
      <Nav pullRight>
        <LinkContainer to='/signup'>
          <NavItem eventKey={3}>Sign up</NavItem>
        </LinkContainer>
      </Nav>
      <Nav pullRight>
        <LinkContainer to='/signin'>
          <NavItem eventKey={2}>Sign in</NavItem>
        </LinkContainer>
      </Nav>
      <Nav pullRight>
        <LinkContainer to='/fixtures'>
          <NavItem eventKey={1}>Predictions</NavItem>
        </LinkContainer>
      </Nav>
    </Navbar.Collapse>
  </Navbar>
}

export default NavHeader;
