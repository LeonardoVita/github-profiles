import axios from 'axios'

const hasLocalHost = window.location.hostname.includes('localhost')

const backend = axios.create({  
  baseURL: hasLocalHost ? 'http://localhost:3333' : 'https://ghprofiles.herokuapp.comss'  
})

export default backend 