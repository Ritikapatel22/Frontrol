import axios from 'axios'
import { apiBaseUrl } from '../config'

export default axios.create({
  baseURL: apiBaseUrl + '/users',
  headers: {
    'Content-type': 'application/json',
  },
})
