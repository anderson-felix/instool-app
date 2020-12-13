import Axios from 'axios';

export const api = Axios.create({
  baseURL: 'https://instool.herokuapp.com/'
})

api.interceptors.response.use(
  (resp) => resp.data,
  (error)=> Promise.reject(error)
)