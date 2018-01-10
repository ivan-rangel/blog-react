import React, { Component } from 'react';
import {
    Nav,
    Navbar,
    NavItem
} from 'react-bootstrap';

import { LinkContainer } from 'react-router-bootstrap'



class Header extends Component {
    render() {
        return (
            <Navbar inverse collapseOnSelect>
                <Navbar.Header>
                    <Navbar.Brand>
                        <LinkContainer to ="/">
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
                    <Nav pullRight>
                        <NavItem eventKey={1} href="#">
                            Log In
				        </NavItem>
                        <NavItem eventKey={2} href="#">
                            Sign UP
				        </NavItem>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
        );
    }
}

export default Header;
