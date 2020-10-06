import React, { useState, useEffect } from 'react';
import api from '../../services/api';

export default function Home() {

  const [code, setCode] = useState('');

  useEffect(() => {
    const newUrl = window.location.href.split("?code=")
    setCode(newUrl[1])
    // window.history.pushState({}, null, newUrl[0]);
  }, [])

  api.post(`https://github.com/login/oauth/access_token`, {
    params: {
      client_id: process.env.REACT_APP_CLIENT_ID,
      client_secret: process.env.REACT_APP_CLIENT_SECRET,
      code: code
    }
  }).then(res => {
    console.log(res)
  })

  return (
    <h1>code: {code}</h1>
  )
}