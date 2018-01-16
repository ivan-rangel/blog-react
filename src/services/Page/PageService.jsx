import axiosInstance from '../Interceptor/Interceptor';

const api_url = '/api/v1/pages';

const getPages = () => {
  return axiosInstance.get(api_url)

}

const getPage = (page) => {
  return axiosInstance.get(`${api_url}/${page}`)
}

const updatePage = (page) => {
  return axiosInstance.patch(api_url, page)
}

const sendContact = (contact) => {
  let api_url = '/api/v1/contact';
  return axiosInstance.post(api_url, contact)
}

export {
  getPages,
  getPage,
  sendContact,
  updatePage
}

