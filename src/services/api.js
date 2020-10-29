import axios from 'axios'

const github = axios.create({
  baseURL: 'https://api.github.com'
})

const backend = axios.create({
  baseURL: 'https://ghprofiles.herokuapp.com'
})

export { github, backend }