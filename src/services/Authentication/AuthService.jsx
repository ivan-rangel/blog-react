import decode from 'jwt-decode';
import axios from 'axios';

export default class AuthService {
  // Initializing important variables
  constructor() {
    this.apiUrl = 'http://local.blog.com:8080/api/v1' // API server domain
    //this.fetch = this.fetch.bind(this) // React binding stuff
    this.login = this.login.bind(this)
    this.logout = this.logout.bind(this)
    this.signUp = this.signUp.bind(this)
    this.currentUser = this.currentUser.bind(this)
  }

  saveToken(token) {
    // Saves user token to localStorage
    localStorage.setItem('react-blog-token', token)
  }

  login(user) {
    // Get a token from api server using the fetch api
    let promise = new Promise((resolve, reject) => {
      axios.post(`${this.apiUrl}/users/login`, user)
        .then(res => {
          let token = res.data.token;
          this.saveToken(token) // Setting the token in localStorage
          resolve();
        })
        .catch(err => {
          reject(err.response)
        })
    })
    return promise;
  }

  logout() {
    // Clear user token and profile data from localStorage
    localStorage.removeItem('react-blog-token');
  }

  signUp(user) {
    if (user.password !== user.confirmedPassword) {
      alert(`Passwords don't match`)
      return
    }
    let promise = new Promise((resolve, reject) => {
      axios.post(`${this.apiUrl}/users`, user)
        .then(res => {
          let token = res.data.token;
          this.saveToken(token);
          return resolve()
        })
        .catch((err) => {
          console.log(err.response);
          return reject(err.response)
        });
    })
    return promise;
  }

  isLoggedIn() {
    // Checks if there is a saved token and it's still valid
    const token = this.getToken() // GEtting token from localstorage
    return !!token && !this.isTokenExpired(token) // handwaiving here
  }


  isTokenExpired(token) {
    try {
      const decoded = decode(token);
      if (decoded.exp < Date.now() / 1000) { // Checking if token is expired. N
        return true;
      }
      else
        return false;
    }
    catch (err) {
      return false;
    }
  }

  getToken() {
    // Retrieves the user token from localStorage
    return localStorage.getItem('react-blog-token')
  }

  currentUser() {
    // Using jwt-decode npm package to decode the token
    if (this.isLoggedIn()) {
      return decode(this.getToken());
    } else {
      return null
    }
  }
  getNewToken() {
    let promise = new Promise((resolve, reject) => {
      axios.post(`${this.API_URL}/users/newToken`, {})
        .then(response => {
          if (this.currentUser()["userType"] !== 'admin') {
            let token = response.data["token"]
            this.saveToken(token);
            resolve();
          }
        }).catch(err => {
          console.log("Error while requesting new token", err.response);
          reject(err.response);
        });
    })
    return promise
  }


  // fetch(url, options) {
  //   // performs api calls sending the required authentication headers
  //   const headers = {
  //     'Accept': 'application/json',
  //     'Content-Type': 'application/json'
  //   }

  //   // Setting Authorization header
  //   // Authorization: Bearer xxxxxxx.xxxxxxxx.xxxxxx
  //   if (this.loggedIn()) {
  //     headers['Authorization'] = 'Bearer ' + this.getToken()
  //   }

  //   return fetch(url, {
  //     headers,
  //     ...options
  //   })
  //     .then(this._checkStatus)
  //     .then(response => response.json())
  // }

  // _checkStatus(response) {
  //   // raises an error in case response status is not a success
  //   if (response.status >= 200 && response.status < 300) { // Success status lies between 200 to 300
  //     return response
  //   } else {
  //     var error = new Error(response.statusText)
  //     error.response = response
  //     throw error
  //   }
}
