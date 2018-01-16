import React, { Component } from 'react';
import { Col, Grid, Row } from 'react-bootstrap';
import PostService from '../../../services/posts/PostService'
import { Link } from 'react-router-dom'
import { FormattedRelative } from 'react-intl';
class Post extends Component {
  constructor(props) {
    super(props)
    this.postS = new PostService();
    this.state = {
      post: {}
    }
  }
  componentDidMount() {
    if (this.props.match) {
      const postId = this.props.match.params.postId;
      if (postId) {
        this.postS.getPost(postId)
          .then(response => {
            this.setState({
              post: response.data
            })
          })
          .catch(response => {
            console.log(response);
          })
      }
    }

  }
  render() {
    if (this.props.post) {
      return (
        <Col md={4} xs={12}>
          <h2>
            <Link to={`/post/${this.props.post._id}`}>
              {this.props.post.title}
            </Link>
          </h2>
          <h3>{this.props.post.body}</h3>
          <h4><FormattedRelative value={this.props.post.createdAt} />
            {this.props.post.author ?
              <span> by <b> {this.props.post.author.firstName} {this.props.post.author.lastName}</b>
              </span> :
              ''}
          </h4>
        </Col>
      );
    } else {
      return (
        <Grid>
          <Row>
            <Col md={4} xs={12}>
              <h1>
                {this.state.post.title}
              </h1>
              <h2>{this.state.post.body}</h2>
              <h3>{this.state.post.createdAt}
                {this.state.post.author ?
                  <span> by {this.state.post.author.firstName} {this.state.post.author.lastName}</span> :
                  ''}
              </h3>
            </Col>
          </Row>
        </Grid>
      )
    }
  }
}

export default Post;
