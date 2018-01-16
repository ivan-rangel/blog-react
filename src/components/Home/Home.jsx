import React, { Component } from 'react';
import { Grid, Row, Col, Button } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap'

//Components
import HtmlSection from '../HtmlSection/HtmlSection'
import FeaturedPostsList from '../Post/FeaturedPostList/FeaturedPostsList'
import RegularPostsList from '../Post/RegularPostList/RegularPostsList'

//Services
import AuthService from '../../services/Authentication/AuthService'
import { getPage } from '../../services/Page/PageService'

class Home extends Component {
  constructor() {
    super()
    this.state = {
      sectionsContent: []
    }
    this.authS = new AuthService();
  }
  componentWillMount() {
    getPage('home')
      .then(res => {
        this.setState({
          sectionsContent: res.data.content
        })
      })
      .catch(err => {
        console.log(err.response);
      })
  }

  render() {
    return (

      <Grid>
        <div className='text-justify'>

          {this.state.sectionsContent.map((content, index, array) => {
            return (
              <Row key={index} >
                {index === 1 ?
                  <div>
                    <Col xs={12} md={6}>
                      <HtmlSection content={content} />
                    </Col>
                    <Col xs={12} md={6}>
                      <HtmlSection content={array[index + 1]} />
                    </Col>
                  </div> : index === 2 ?
                    ''
                    :
                    <Col xs={12} md={12}>
                      <HtmlSection content={content} />
                    </Col>
                }
              </Row>
            )
          })}

          {this.authS.isLoggedIn() ?
            < Row >
              <Col xs={12} md={12}>

                <LinkContainer to='/post-create' activeClassName="">
                  <Button bsStyle="primary" type="button">Add Post </Button>
                </LinkContainer>
              </Col>
            </Row> :
            ''}
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
