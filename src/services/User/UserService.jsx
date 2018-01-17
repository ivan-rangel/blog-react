import axiosInstance from '../Interceptor/Interceptor'

export default class UserService {
  // Initializing important variables
  constructor() {
    this.api_url = '/api/v1/users' // API server domain
    this.getUsers = this.getUsers.bind(this)
    this.update = this.update.bind(this)
    this.delete = this.delete.bind(this)

  }

  getUsers() {
    return axiosInstance.get(this.api_url)
  }
  delete(userId) {
    return axiosInstance.delete(`${this.api_url}/${userId}`)
  }
  update(user) {
    return axiosInstance.patch(`${this.api_url}`, user)
  }
}
