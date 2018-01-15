import React, { Component } from 'react';
import { getPosts } from '../../../services/posts/PostService'
import Post from '../Post/Post'


class FeaturedPostsList extends Component {
  constructor(props) {
    super(props)
    this.state = {
      posts: []
    }

  }
  componentWillMount() {
    getPosts()
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
        .filter(post => post.isFeatured && post.isVisible)
        .map((post, key) => {
          return (

            <Post post={post} key={post._id} />
          )

        })
    );
  }
}

export default FeaturedPostsList;
