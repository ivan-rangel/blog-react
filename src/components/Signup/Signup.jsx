import React, { Component } from 'react';
import { Grid, Row, Col, FormControl, FormGroup, ControlLabel, Button } from 'react-bootstrap';
import AuthService from '../../services/Authentication/AuthService';
import FontAwesome from 'react-fontawesome'

class Signup extends Component {
  constructor(props) {
    super(props)
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.authS = new AuthService();

    this.state = {
      user: {}
    };
  }
  componentWillMount() {
    if (this.authS.isLoggedIn()) {
      return this.props.history.replace('/');
    }
  }
  handleChange(e) {
    let user = Object.assign({}, this.state.user);
    user[e.target.id] = e.target.value;
    this.setState({ user });
  }

  handleSubmit(event) {
    event.preventDefault();
    //this.setState({ value: event.target.value });
    this.authS.signUp(this.state.user)
      .then(() => {
        this.props.history.push('/')
        setTimeout(() => {
          window.location.reload()
        }, 500);
      })
  }
  render() {

    return (
      <Grid>
        <Row>
          <Col md={12} xs={12}>
            <h1>Sign Up</h1>
            <form onSubmit={this.handleSubmit}>
              <FormGroup
                controlId="firstName"
              >
                <ControlLabel>First Name</ControlLabel>
                <FormControl
                  type="text"
                  placeholder="Ivan"
                  onChange={this.handleChange}
                />
              </FormGroup>

              <FormGroup
                controlId="lastName"
              >
                <ControlLabel>Last Name</ControlLabel>
                <FormControl
                  type="text"
                  placeholder="Rangel"
                  onChange={this.handleChange}
                />
              </FormGroup>

              <FormGroup
                controlId="email"
              >
                <ControlLabel>Email</ControlLabel>
                <FormControl
                  type="text"
                  placeholder="something@whatever.any"
                  onChange={this.handleChange}
                />
              </FormGroup>

              <FormGroup
                controlId="password"
              >
                <ControlLabel>Password</ControlLabel>
                <FormControl
                  type="password"
                  placeholder="Password"
                  onChange={this.handleChange}
                />
              </FormGroup>
              <FormGroup
                controlId="confirmedPassword"
              >
                <ControlLabel>Confirm Password</ControlLabel>
                <FormControl
                  type="password"
                  placeholder="Confirm Password"
                  onChange={this.handleChange}
                />
              </FormGroup>

              <FormGroup
                controlId="signup"
              >
                <Button bsStyle="primary" type="submit">Sign up</Button>
              </FormGroup>
            </form>

            <div>
              <a href="/api/v1/users/facebookLogin">
                <span>
                  <FontAwesome
                    name='facebook-official'
                    size='4x'
                  />
                </span>
              </a>
            </div>
          </Col>
        </Row>
      </Grid>
    );

  }
}

export default Signup;
