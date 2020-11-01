import React, {useEffect} from 'react';
import { useHistory } from 'react-router-dom'
import backend  from '../../services/api'

import './styles.css'
import imgGithubLight from '../../img/github-mark/GitHub-Mark-Light-32px.png'
import LoginImg from '../../img/login.svg'

import Header from '../../components/Header/Header';
import Head from '../../components/Head';

export default function Login() {
  
  // const REDIRECT_URI = "http://localhost:3000/login" 
  // const CLIENT_ID = "8eb480b0ac01ef230b5f" 

  const REDIRECT_URI = "https://ghprofiles-5cf24.web.app/login/callback" 
  const CLIENT_ID = "52196b4b63ed01cc4ee0"
  
  let history = useHistory()   
  const url = window.location.href 
  const hasCode = url.includes("?code=")

  useEffect(()=>{

    async function handleLogin(){  

      try {
        const newUrl = url.split("?code=")
        window.history.pushState({}, null, newUrl[0])
        const code = newUrl[1]
    
        const res = await backend.post('/Authorize', { code })           
        const data = res.data

        window.localStorage.setItem("access_token", data.access_data.access_token)
        window.localStorage.setItem("token_type", data.access_data.token_type)
        window.localStorage.setItem("scope", data.access_data.cope)
        window.localStorage.setItem('user_data', JSON.stringify(data.user_data))
        history.push('/')
                
      } catch (error) {        
        console.error(error.message)
      } 

    }

   hasCode && handleLogin();

  },[history,url,hasCode])

  return (
    <div className="wrap">
      <Head title="Login" description="Faça o login o app GHProfiles"/>
      <Header paragraph="Faça login para começar a navegar por esse github app"/>
      <div className="longin-area container">
        <div className="grid-10">
          <img src={LoginImg} alt="activity-developer" className="login-img" />
        </div>
        <div className="grid-1"/>
        <div className="grid-5">
          <a href={`https://github.com/login/oauth/authorize?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}`} className="button-container">
            <img src={imgGithubLight} alt="GitHub Logo light" />
            <p>Github Login</p>
          </a>
        </div>
      </div>
    </div>
  )
}