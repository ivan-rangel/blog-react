import React, { Component } from 'react';
import {
  Grid,
  Row,
  Col,
  Panel,
  PanelGroup,
  Tab,
  Nav,
  NavItem,
  Table,
  Modal,
  Button
} from 'react-bootstrap';
import AuthService from '../../services/Authentication/AuthService'
import PostService from '../../services/posts/PostService'
import UserService from '../../services/User/UserService'
import { updatePage, getPages } from '../../services/Page/PageService'
import { FormattedRelative, FormattedDate } from 'react-intl';
import FontAwesome from 'react-fontawesome'
import HtmlSection from '../HtmlSection/HtmlSection'

// Require Editor JS files.
import 'froala-editor/js/froala_editor.pkgd.min.js';

// Require Editor CSS files.
import 'froala-editor/css/froala_style.min.css';
import 'froala-editor/css/froala_editor.pkgd.min.css';

// Require Font Awesome.
import 'font-awesome/css/font-awesome.css';

import FroalaEditor from 'react-froala-wysiwyg';

import './Admin.css'

class Admin extends Component {
  constructor() {
    super()
    this.authS = new AuthService();
    this.postS = new PostService();
    this.userS = new UserService();
    this.deleteUser = this.deleteUser.bind(this);
    this.deletePost = this.deletePost.bind(this);
    this.featurePost = this.featurePost.bind(this);
    this.shownPost = this.shownPost.bind(this);
    this.handleModelChange = this.handleModelChange.bind(this);

    this.state = {
      model: 'Example text',
      users: [],
      posts: [],
      pages: [],
      showModal: false,
      page: {},
      numSection: null
    }
  }


  componentWillMount() {
    if (!this.authS.isLoggedIn() || (this.authS.currentUser() && this.authS.currentUser().userType !== 'admin')) {
      return this.props.history.replace('/');
    }
    this.getUsers();
    this.getPosts();
    this.getPages();
  }

  getUsers() {
    this.userS.getUsers()
      .then(res => {
        this.setState({
          users: res.data
        })
      })
      .catch(err => {
        console.log(err.response);
      })
  }

  deleteUser(userId) {
    this.userS.delete(userId)
      .then(res => {
        alert('User deleted')
        this.getUsers()
      })
      .catch(res => {
        console.log(res);
      })
  }

  getPosts() {
    this.postS.getPosts()
      .then(res => {
        this.setState({
          posts: res.data
        })
      })
      .catch(err => {
        console.log(err.response);
      })
  }

  featurePost(postId) {
    this.postS.feature(postId)
      .then(res => {
        alert('Post updated')
        this.getPosts()
      })
      .catch(err => {
        console.log(err.response);
      })
  }
  shownPost(postId) {
    this.postS.shown(postId)
      .then(res => {
        alert('Post updated')
        this.getPosts()
      })
      .catch(err => {
        console.log(err.response);
      })
  }

  deletePost(postId) {
    this.postS.delete(postId)
      .then(res => {
        alert('Post deleted')
        this.getPosts()
      })
      .catch(err => {
        console.log(err.response);
      })
  }

  getPages() {
    getPages()
      .then((res) => {
        this.setState({ pages: res.data })
      })
      .catch((err) => {
        console.log(err.response);
      })
  }

  editSection(section, page, numSection) {
    this.setState({
      showModal: true,
      model: section,
      page: page,
      numSection: numSection
    })
  }
  handleModelChange(model) {
    this.setState({
      model: model
    });
  }
  updatePage(page, numSection) {
    page.content[numSection] = this.state.model;
    updatePage(page)
      .then(res => {
        console.log(res);
        this.closeModal()
        this.getPages()

      })
      .catch(err => {
        console.log(err.response);

      })
  }

  closeModal() {
    this.setState({ showModal: false });
  }

  render() {
    const users =
      this.state.users
        .map((user, index) => {
          return (
            <tr key={user._id}>
              <td>
                {index + 1}
              </td>
              <td>
                {user.firstName}
              </td>
              <td>
                {user.lastName}
              </td>
              <td>
                {user.email}
              </td>
              <td>
                <FormattedDate value={user.createdAt} /> -
                (<FormattedRelative value={user.createdAt} />)
              </td>
              <td>

                <FontAwesome name='trash' onClick={() => this.deleteUser(user._id)} />

              </td>
            </tr >
          )
        })
    const posts =
      this.state.posts
        .map((post, index) => {
          return (
            <tr key={post._id}>
              <td>
                {index + 1}
              </td>
              <td>
                {post.title}
              </td>
              <td>
                {post.body}
              </td>
              <td>
                <FormattedDate value={post.createdAt} /> -
                (<FormattedRelative value={post.createdAt} />)
              </td>
              <td>
                {post.isFeatured ?
                  <FontAwesome name='star' onClick={() => this.featurePost(post._id)} /> :
                  <FontAwesome name='star-o' onClick={() => this.featurePost(post._id)} />
                }
                {post.isVisible ?
                  <FontAwesome name='eye' onClick={() => this.shownPost(post._id)} /> :
                  <FontAwesome name='eye-slash' onClick={() => this.shownPost(post._id)} />
                }
                <FontAwesome name='trash' onClick={() => this.deletePost(post._id)} />
              </td >
            </tr >
          )
        })
    const panels =
      this.state.pages
        .map((page, index) => {
          return (
            <Panel eventKey={index} bsStyle="primary" key={index} >
              <Panel.Heading>
                <Panel.Title toggle>{page.name} Page</Panel.Title>
              </Panel.Heading>
              <Panel.Body collapsible>
                {
                  page.content.map((section, index) => {
                    return (
                      <span key={index} onClick={() => this.editSection(section, page, index)}>
                        <HtmlSection content={section} customClass='section' />
                      </span>
                    )
                  })
                }
              </Panel.Body>
            </Panel>

          )
        })

    let closeModal = () => this.setState({ showModal: false });

    return (
      <Grid>
        <Tab.Container id="left-tabs-example" defaultActiveKey="first">
          <Row className="clearfix">
            <Col sm={2}>
              <Nav bsStyle="pills" stacked>
                <NavItem eventKey="first">Users</NavItem>
                <NavItem eventKey="second">Posts</NavItem>
                <NavItem eventKey="third">Pages</NavItem>
              </Nav>
            </Col>
            <Col sm={10}>
              <Tab.Content animation>
                <Tab.Pane eventKey="first">
                  <Table responsive hover>
                    <thead>
                      <tr>
                        <th>#</th>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Email</th>
                        <th>Member since</th>
                        <th>Options</th>
                      </tr>
                    </thead>
                    <tbody>
                      {users}
                    </tbody>
                  </Table>
                </Tab.Pane>
                <Tab.Pane eventKey="second">
                  <Table responsive hover>
                    <thead>
                      <tr>
                        <th>#</th>
                        <th>Title</th>
                        <th>Body</th>
                        <th>Created at</th>
                        <th>Options</th>
                      </tr>
                    </thead>
                    <tbody>
                      {posts}
                    </tbody>
                  </Table>
                </Tab.Pane>
                <Tab.Pane eventKey="third">
                  <PanelGroup accordion id="accordion-example" >
                    {panels}
                  </PanelGroup>
                </Tab.Pane>
              </Tab.Content>
            </Col>
          </Row>
        </Tab.Container>
        <Modal
          show={this.state.showModal}
          onHide={closeModal}
          bsSize="large"
          aria-labelledby="contained-modal-title-lg"
        >
          <Modal.Header closeButton>
            <Modal.Title id="contained-modal-title-lg">{this.state.page.name} {this.state.numSection + 1}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <FroalaEditor
              model={this.state.model}
              onModelChange={this.handleModelChange}
            />
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={closeModal}>Close</Button>
            <Button bsStyle='primary' onClick={() => this.updatePage(this.state.page, this.state.numSection)}>Update</Button>
          </Modal.Footer>
        </Modal>
      </Grid >
    )
  };
}

export default Admin;
