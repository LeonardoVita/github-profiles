import React from 'react';

import './styles.css'
import imgGithubLight from '../../img/github-mark/GitHub-Mark-Light-32px.png'
import Header from '../../components/Header/Header';
import Head from '../../components/Head';

export default function Login() {
  
  const REDIRECT_URI = "http://localhost:3000/login/callback" 
  const CLIENT_ID = "8eb480b0ac01ef230b5f" 

  // const REDIRECT_URI = "https://ghprofiles-5cf24.web.app/login/callback" 
  // const CLIENT_ID = "52196b4b63ed01cc4ee0"

  return (
    <div className="wrap">
      <Head title="Login" description="Faça o login o app GHProfiles"/>
      <Header paragraph="Faça login para começar a navegar por esse github app"/>
      <div className="longin-area container">
        <div className="grid-4">
          <a href={`https://github.com/login/oauth/authorize?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}`} className="button-container">
            <img src={imgGithubLight} alt="GitHub Logo light" />
            <p>Github Login</p>
          </a>
        </div>
      </div>

    </div>
  )
}