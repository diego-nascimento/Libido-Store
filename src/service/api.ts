import axios from 'axios'

export const api = axios.create({
  baseURL: 'https://libido-strapi.herokuapp.com/'
})

