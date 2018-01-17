import React, { Component } from 'react';
import {
  Nav,
  Navbar,
  NavItem
} from 'react-bootstrap';

import { LinkContainer } from 'react-router-bootstrap'
import AuthService from '../../services/Authentication/AuthService'

class Header extends Component {
  constructor(props) {
    super(props)
    this.handleLogout = this.handleLogout.bind(this);
    this.authS = new AuthService();
    this.state = {
      isLoggedIn: false,
      currentUser: null
    }
  }

  componentWillMount() {
    this.setState({
      isLoggedIn: this.authS.isLoggedIn(),
      currentUser: this.authS.currentUser()
    })
  }

  handleLogout(e) {
    e.preventDefault();
    this.authS.logout()
    

    setTimeout(() => {
      window.location.reload()
    }, 500);
  }
  render() {

    return (
      <Navbar inverse collapseOnSelect>
        <Navbar.Header>
          <Navbar.Brand>
            <LinkContainer to="/">
              <a> GB Blog React</a>
            </LinkContainer>
          </Navbar.Brand>
          <Navbar.Toggle />
        </Navbar.Header>
        <Navbar.Collapse>
          <Nav>
            <LinkContainer to='/contact' activeClassName="">
              <NavItem eventKey={1}>
                Contact
				            </NavItem>
            </LinkContainer>
          </Nav>
          {!this.state.isLoggedIn ?
            (<Nav pullRight>
              <LinkContainer to='/login' activeClassName="">
                <NavItem eventKey={1}>
                  Log In
				            </NavItem>
              </LinkContainer>
              <LinkContainer to='/signup' activeClassName="">
                <NavItem eventKey={2}>
                  Sign Up
				            </NavItem>
              </LinkContainer>
            </Nav>
            ) :
            (

              <Nav pullRight>
                <LinkContainer to={this.state.currentUser.userType === 'user' ? '/profile' : '/admin'} activeClassName="">
                  <NavItem eventKey={1}>
                    Welcome {this.state.currentUser.firstName} {this.state.currentUser.lastName}
                  </NavItem>
                </LinkContainer>

                <NavItem eventKey={2} onClick={this.handleLogout}>
                  Log out
                </NavItem>


              </Nav>
            )}
        </Navbar.Collapse>
      </Navbar>
    );
  }
}

export default Header;
