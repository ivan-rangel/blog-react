import React, { Component } from 'react';
import {
  Grid,
  Row,
  Col,
  FormControl,
  FormGroup,
  ControlLabel,
  Button,
  Tab,
  Nav,
  NavItem,
  Clearfix
} from 'react-bootstrap';
import AuthService from '../../services/Authentication/AuthService'
import PostService from '../../services/posts/PostService'
import UserService from '../../services/User/UserService'
import Post from '../Post/Post/Post'
import './Profile.css'


class Profile extends Component {
  constructor() {
    super()
    this.authS = new AuthService();
    this.postS = new PostService();
    this.userS = new UserService();
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.state = {
      user: this.authS.currentUser(),
      editableUser: this.authS.currentUser(),
      profileURL: '/profile_imgs/',
      posts: []
    }
  }

  componentWillMount() {
    if (!this.authS.isLoggedIn()) {
      return this.props.history.replace('/');
    }
    this.postS.getPostByUser(this.state.user._id)
      .then(res => {
        this.setState({
          posts: res.data
        })
      })
      .catch(err => {
        console.log(err.response);
      })
  }

  handleChange(e) {
    let editableUser = Object.assign({}, this.state.editableUser);
    editableUser[e.target.id] = e.target.value;
    this.setState({ editableUser });
  }

  handleSubmit(event) {
    event.preventDefault();
    this.userS.update(this.state.editableUser)
      .then(res => {
        this.authS.getNewToken()
          .then(() => {
            window.location.reload()
          })
      })
      .catch(res => {
        console.log(res);
      })
  }

  render() {
    const userPosts =
      this.state.posts
        .filter(post => post.isVisible)
        .map((post, index) => {
          if (index % 2 === 0) {
            return (
              <div key={post._id}>
                <Clearfix />
                <Post post={post} fromUser='true' />
              </div>
            )
          } else {
            return (
              <Post post={post} key={post._id} fromUser='true' />
            )
          }
        })

    return (
      <Grid>
        <Tab.Container id="left-tabs-example" defaultActiveKey="first">
          <Row className="clearfix">
            <Col sm={2}>
              <Nav bsStyle="pills" stacked>
                <NavItem eventKey="first">My Posts</NavItem>
                <NavItem eventKey="second">My Info</NavItem>
                {/* <NavItem eventKey="third">My Profile Image</NavItem> */}
              </Nav>
            </Col>
            <Col sm={10}>
              <Tab.Content animation>
                <Tab.Pane eventKey="first">
                  {userPosts}
                </Tab.Pane>
                <Tab.Pane eventKey="second">
                  <form onSubmit={this.handleSubmit}>
                    <FormGroup controlId="firstName" >
                      <ControlLabel>First Name</ControlLabel>
                      <FormControl
                        type="text"
                        placeholder="Ivan"
                        onChange={this.handleChange}
                        value={this.state.editableUser.firstName}
                      />
                    </FormGroup>

                    <FormGroup controlId="lastName" >
                      <ControlLabel>Last Name</ControlLabel>
                      <FormControl
                        type="text"
                        placeholder="Rangel"
                        onChange={this.handleChange}
                        value={this.state.editableUser.lastName}
                      />
                    </FormGroup>

                    <FormGroup controlId="email" >
                      <ControlLabel>Email</ControlLabel>
                      <FormControl
                        type="text"
                        placeholder="email@any.com"
                        onChange={this.handleChange}
                        value={this.state.editableUser.email}
                      />
                    </FormGroup>
                    <FormGroup controlId="update">
                      <Button bsStyle="primary" type="submit">Update Info</Button>
                    </FormGroup>
                  </form>
                </Tab.Pane>
              </Tab.Content>
            </Col>
          </Row>
        </Tab.Container>
      </Grid >
    )
  };
}

export default Profile;
