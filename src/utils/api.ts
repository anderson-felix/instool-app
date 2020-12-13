import Axios from 'axios';

export const api = Axios.create({
  baseURL: 'http://localhost:3001/'
})

api.interceptors.response.use(
  (resp) => resp.data,
  (error)=> Promise.reject(error)
)