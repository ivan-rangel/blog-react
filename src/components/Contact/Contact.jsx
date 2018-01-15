import React, { Component } from 'react';
import { Grid, Row, Col } from 'react-bootstrap';
import {
  Section1,
  Section2,
} from './Sections/Sections'

class Contact extends Component {
  
  render() {
    return (
      <Grid>
        <Row>
          <Col xs={12} md={6}>
            <h2>Here goes the form</h2>
          </Col>
          <Col xs={12} md={6} className="text-justify">
            <Section1 />
            <Section2 />

          </Col>
        </Row>
      </Grid>
    );
  }
}

export default Contact;
