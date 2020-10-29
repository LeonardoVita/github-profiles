import React from 'react';

import './styles.css'
import imgGithubLight from '../../img/github-mark/GitHub-Mark-Light-32px.png'

export default function Login() {
  const REDIRECT_URI = "https://ghprofiles-5cf24.web.app/login/callback"
  return (
    <div className="wrap">

      <header className="header-container">
        <div className="container">
          <h1>GHProfiles</h1>
          <p>Faça login para começar a navegar por esse github app</p>
        </div>
      </header>
      <div className="longin-area container">

        <div className="grid-4">
          <a href={`https://github.com/login/oauth/authorize?client_id="52196b4b63ed01cc4ee0"&redirect_uri=${REDIRECT_URI}`} className="button-container">
            <img src={imgGithubLight} alt="GitHub Logo light" />
            <p>Github Login</p>
          </a>
        </div>

      </div>
    </div>
  )
}