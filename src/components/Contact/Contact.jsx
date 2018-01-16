import React, { Component } from 'react';
import { Grid, Row, Col, FormControl, FormGroup, ControlLabel, Button } from 'react-bootstrap';
import HtmlSection from '../HtmlSection/HtmlSection'
import { getPage, sendContact } from '../../services/Page/PageService'
import AuthService from '../../services/Authentication/AuthService'


class Contact extends Component {
  constructor() {
    super()
    this.authS = new AuthService();
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.state = {
      sectionsContent: [],
      user: this.authS.currentUser(),
      contact: {}
    }
  }

  componentWillMount() {
    if (this.state.user) {
      let contact = Object.assign({}, this.state.contact);
      contact.firstName = this.state.user.firstName;
      contact.lastName = this.state.user.lastName;
      contact.email = this.state.user.email;
      this.setState({ contact });
    }
    getPage('contact')
      .then(res => {
        this.setState({
          sectionsContent: res.data.content
        })
      })
      .catch(err => {
        console.log(err.response);
      })
  }

  handleChange(e) {
    let contact = Object.assign({}, this.state.contact);
    contact[e.target.id] = e.target.value;
    this.setState({ contact });
  }

  handleSubmit(event) {
    event.preventDefault();
    sendContact(this.state.contact)
      .then(() => {
        alert('Message sent to the admin')
        this.setState({
          contact: {}
        })
      })
      .catch((err) => {
        console.log(err.response);
        alert('Error sending the message')
      })


  }

  render() {
    return (
      <Grid>
        <Row>
          <Col xs={12} md={6}>
            <h1>Contact Us</h1>
            <form onSubmit={this.handleSubmit}>
              <FormGroup controlId="firstName" >
                <ControlLabel>First Name</ControlLabel>
                <FormControl
                  type="text"
                  placeholder="Ivan"
                  onChange={this.handleChange}
                  value={this.state.user ? this.state.user.firstName : ''}
                />
              </FormGroup>

              <FormGroup controlId="lastName" >
                <ControlLabel>Last Name</ControlLabel>
                <FormControl
                  type="text"
                  placeholder="Rangel"
                  onChange={this.handleChange}
                  value={this.state.user ? this.state.user.lastName : ''}
                />
              </FormGroup>

              <FormGroup controlId="email">
                <ControlLabel>Email</ControlLabel>
                <FormControl
                  type="text"
                  placeholder="mail"
                  onChange={this.handleChange}
                  value={this.state.user ? this.state.user.email : ''}
                />
              </FormGroup>
              <FormGroup controlId="message">
                <ControlLabel>Message</ControlLabel>
                <FormControl
                  componentClass="textarea"
                  placeholder="Once upon a time...."
                  onChange={this.handleChange}
                />
              </FormGroup>

              <FormGroup controlId="contactUs">
                <Button bsStyle="primary" type="submit">Contact Us</Button>
              </FormGroup>

            </form>
          </Col >
          <Col xs={12} md={6} className="text-justify">
            {this.state.sectionsContent.map((content, index) => {
              return (
                <HtmlSection content={content} key={index} />
              )
            })}

          </Col>
        </Row >
      </Grid >
    );
  }
}

export default Contact;
