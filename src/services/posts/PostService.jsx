import axiosInstance from '../Interceptor/Interceptor'

export default class PostService {
  // Initializing important variables
  constructor() {
    this.api_url = 'http://local.blog.com:8080/api/v1/posts' // API server domain
    this.getPost = this.getPost.bind(this)
    this.getPosts = this.getPosts.bind(this)
    this.getPostByUser = this.getPostByUser.bind(this)
    this.create = this.create.bind(this)
    this.delete = this.delete.bind(this)
    this.feature = this.feature.bind(this)
    this.shown = this.shown.bind(this)    
  }

  getPosts() {
    return axiosInstance.get(this.api_url)
  }
  getPost(postId) {
    return axiosInstance.get(`${this.api_url}/${postId}`)
  }

  getPostByUser(userId) {
    return axiosInstance.get(`${this.api_url}/userId/${userId}`)
  }

  create(post) {
    return axiosInstance.post(this.api_url, post)
  }

  feature(postId) {
    return axiosInstance.patch(`${this.api_url}/featured`, { postId: postId })
  }

  shown(postId) {
    return axiosInstance.patch(`${this.api_url}/shown`, { postId: postId })
  }

  delete(postId) {
    return axiosInstance.delete(`${this.api_url}/${postId}`)
  }
}
