import React from 'react';
import {Navbar, Nav, NavItem, NavDropdown, MenuItem} from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import './navbar.css';

const NavHeader = (props) => {
  const {user} = localStorage.getItem('user_id');
  const {signOut} = props;
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
      {
        !user && <div>
          <Nav pullRight>
            <LinkContainer to='/signup'>
              <NavItem eventKey={3}>Sign up</NavItem>
            </LinkContainer>
          </Nav>
          <Nav pullRight>
            <LinkContainer to='/signin'>
              <NavItem eventKey={4}>Sign in</NavItem>
            </LinkContainer>
          </Nav>
          <Nav pullRight>
            <LinkContainer to='/fixtures'>
              <NavItem eventKey={2}>Predictions</NavItem>
            </LinkContainer>
          </Nav>
        </div>
      }
      {
        user && <div>
          <Nav pullRight>
            <NavDropdown eventKey={1} title={`Welcome, ${user.fullname}`} id='navDropdown'>
              <LinkContainer to='/user'>
                <MenuItem eventKey={1.1}>Edit Profile</MenuItem>
              </LinkContainer>
              <MenuItem eventKey={1.2} onClick={signOut}>Sign out</MenuItem>
            </NavDropdown>
          </Nav>
          <Nav pullRight>
            <LinkContainer to='/fixtures'>
              <NavItem eventKey={2}>Predictions</NavItem>
            </LinkContainer>
          </Nav>
        </div>
      }
    </Navbar.Collapse>
  </Navbar>
}

export default NavHeader;
