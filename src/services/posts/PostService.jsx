import axios from 'axios';

const api_url = '/api/v1/posts';

const getPosts = () => axios.get(api_url)
const getPost = (postId) => axios.get(`${api_url}/${postId}`)

export {
  getPosts,
  getPost,
}

