import React, { Component } from 'react';
import { Grid, Row, FormControl, FormGroup, ControlLabel, Button } from 'react-bootstrap';
import AuthService from '../../../services/Authentication/AuthService'
import PostService from '../../../services/posts/PostService'

class PostCreate extends Component {
  constructor() {
    super()
    this.authS = new AuthService();
    this.postS = new PostService();
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.state = {
      post: {
        author: this.authS.currentUser()._id
      }
    }
  }
  componentDidMount() {
    if (!this.authS.isLoggedIn()) {
      return this.props.history.replace('/');
    }
  }

  handleChange(e) {
    let post = Object.assign({}, this.state.post);
    post[e.target.id] = e.target.value;
    this.setState({ post });
  }

  handleSubmit(event) {
    event.preventDefault();
    this.postS.create(this.state.post)
      .then(res => {
        this.props.history.push('/');
      })
      .catch(err => {
        console.log(err);
      })
  }

  render() {
    return (
      <Grid>
        <Row>
          <h1>Add New Post</h1>
          <form onSubmit={this.handleSubmit}>
            <FormGroup
              controlId="title"
            >
              <ControlLabel>Title</ControlLabel>
              <FormControl
                type="text"
                placeholder="Any title here"
                onChange={this.handleChange}
              />
            </FormGroup>

            <FormGroup controlId="body">
              <ControlLabel>Body</ControlLabel>
              <FormControl
                componentClass="textarea"
                placeholder="Once upon a time...."
                onChange={this.handleChange}
              />
            </FormGroup>

            <FormGroup controlId="post">
              <Button bsStyle="primary" type="submit">Create</Button>
            </FormGroup>
          </form>
        </Row>
      </Grid>
    )
  };
}

export default PostCreate;
