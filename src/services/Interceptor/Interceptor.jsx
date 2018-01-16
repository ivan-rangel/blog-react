import axios from 'axios';
import AuthService from '../Authentication/AuthService';

// Add a request interceptor 
const axiosInstance = axios.create();
const authS = new AuthService();

axiosInstance.interceptors.request.use(function (config) {
  if (localStorage['react-blog-token']) {
    config.headers.Authorization = `Bearer ${localStorage['react-blog-token']}`;
  }

  return config;
}, function (error) {
  // Do something with request error 
  return Promise.reject(error);
});

axiosInstance.interceptors.response.use(function (response) {
  if (response.status === 203) {
    authS.getNewToken()
      .then(() => {
        console.log('getting new token', response);
        return response
      }).catch(response => {
        console.log(response);
        return response
      });
  }
  return response;
}, function (error) {
  if (error.response.status === 401 || error.response.status === 403) {
    console.log("You are unathorized to access that route");
  }
  // Do something with response error
  return Promise.reject(error)
});


export default axiosInstance;