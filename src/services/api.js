import axios from 'axios'

const github = axios.create({
  baseURL: 'https://api.github.com'
})

const backend = axios.create({
  baseURL: 'http://localhost:3333'
})

export { github, backend }