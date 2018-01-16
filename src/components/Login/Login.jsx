import React, { Component } from 'react';
import { Grid, Row, Col, FormControl, FormGroup, ControlLabel, Button } from 'react-bootstrap';
import AuthService from '../../services/Authentication/AuthService';
import FontAwesome from 'react-fontawesome'

class Login extends Component {
  constructor(props) {
    super(props)
    this.authS = new AuthService();

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);

    this.state = {
      user: {}
    };
  }

  componentDidMount() {

    if (this.authS.isLoggedIn()) {
      return this.props.history.replace('/');
    }

    const token = this.props.match.params.token;
    if (token) {
      this.authS.saveToken(token);
      this.props.history.push('/');
      setTimeout(() => {
        window.location.reload()
      }, 500);
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
    this.authS.login(this.state.user)
      .then(() => {
        this.props.history.push('/');
        setTimeout(() => {
          window.location.reload()
        }, 500);
      })
      .catch(res => {
        console.log(res);
      })
  }
  render() {

    return (
      <Grid>
        <Row>
          <Col md={12} xs={12}>
            <h1>Log In</h1>
            <div>
              <form onSubmit={this.handleSubmit}>
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
                  controlId="login"
                >
                  <Button bsStyle="primary" type="submit">Log In</Button>
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

            </div >
          </Col>
        </Row>
      </Grid>
    );

  }
}

export default Login;
