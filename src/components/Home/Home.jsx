import React, { Component } from 'react';
import { Grid, Row, Col } from 'react-bootstrap';
import {
  Section1,
  Section2,
  Section3,
  Section4,
  Section5,
} from './Sections/Sections'

import FeaturedPostsList from '../Post/FeaturedPostList/FeaturedPostsList'
import RegularPostsList from '../Post/RegularPostList/RegularPostsList'


class Home extends Component {

  render() {
    return (

      <Grid>
        <div className='text-justify'>
          <Row>
            <Col xs={12} md={12}>
              <Section1 />
            </Col>
          </Row>
          <Row>
            <Col xs={12} md={6}>
              <Section2 />
            </Col>
            <Col xs={12} md={6}>
              <Section3 />
            </Col>
          </Row>
          <Row>
            <Col xs={12} md={12}>
              <Section4 />
            </Col>
          </Row>
          <Row>
            <Col xs={12} md={12}>
              <Section5 />
            </Col>
          </Row>

          <Row>
            <Col xs={12} md={12}>
              <h1>Featured Posts</h1>
              <FeaturedPostsList className="background-blue" />
            </Col>
          </Row>
          <Row>
            <Col xs={12} md={12}>
              <h1>All Posts</h1>
              <RegularPostsList className="background-yellow" />
            </Col>
          </Row>

        </div>

      </Grid>



    );
  }
}

export default Home;
