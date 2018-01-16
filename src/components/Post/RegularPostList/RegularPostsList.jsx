import React, { Component } from 'react';
import PostService from '../../../services/posts/PostService'
import Post from '../Post/Post'
import { Clearfix } from 'react-bootstrap'


class RegularPostsList extends Component {
  constructor(props) {
    super(props)
    this.postS = new PostService();
    this.state = {
      posts: []
    }

  }
  componentWillMount() {
    this.postS.getPosts()
      .then(response => {
        this.setState({
          posts: response.data
        })
      })
      .catch(response => {
        console.log(response);
      })
  }
  render() {
    return (
      this.state.posts
        .filter(post => !post.isFeatured && post.isVisible)
        .map((post, index) => {
          if (index % 3 === 0) {
            return (
              <div key={post._id}>
                <Clearfix />
                <Post post={post} />
              </div>
            )
          } else {
            return (
              <Post post={post} key={post._id} />
            )
          }
        })
    );
  }
}

export default RegularPostsList;
