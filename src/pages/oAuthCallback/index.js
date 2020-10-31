import React from 'react'
import { useHistory } from 'react-router-dom'
import backend  from '../../services/api'

import '../home/styles.css'

const url = window.location.href
const hasCode = url.includes("?code=")



export default function OAuthCallback() {

  let history = useHistory()

  if (hasCode) {
    const newUrl = url.split("?code=")
    window.history.pushState({}, null, newUrl[0])
    const code = newUrl[1]

    backend.post('/Authorize', { code })
      .then(res => {
        const data = res.data
        window.localStorage.setItem("access_token", data.access_data.access_token)
        window.localStorage.setItem("token_type", data.access_data.token_type)
        window.localStorage.setItem("scope", data.access_data.cope)
        window.localStorage.setItem('user_data', JSON.stringify(data.user_data))
        history.push('/')
      })
      .catch((err) => { console.error(err) })
  }

  return <div className="loading"/>
}