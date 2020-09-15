import React, { useState, useEffect } from 'react';
import api from '../../services/api'
import { BiSearchAlt } from 'react-icons/bi'

import './styles.css'

export default function Home() {

  const [name, setName] = useState('')
  const [inputUserName, setInputUserName] = useState('')
  const [userName, setUserName] = useState('')
  const [followers, setFollowers] = useState(0)
  const [repo, setRepo] = useState(0)
  const [imgURL, setimgURL] = useState('')

  const redirectUri = "http://localhost:3000/login/callback";



  useEffect(() => {
    getData("LeonardoVita")
  }, [])


  function handleSearch(e) {
    e.preventDefault()
    getData(inputUserName)
  }

  function getData(inputName) {
    api.get(`users/${inputName}`, {
      params: {
        client_id: process.env.REACT_APP_CLIENT_ID,
        client_secret: process.env.REACT_APP_CLIENT_SECRET
      }
    }).then(res => {
      const data = res.data
      console.log(res)
      setName(data.name)
      setUserName(data.login)
      setFollowers(data.followers)
      setRepo(data.public_repos)
      setimgURL(data.avatar_url)
    })

    // api.get(`https://github.com/login/oauth/authorize`, {
    //   params: {
    //     client_id: inputName,
    //     redirect_url: "http://localhost:3000",

    //   }
    // }).then(res => {
    //   const data = res.data

    //   console.log(res)
    // })
  }



  return (
    <div>
      <header className="header-container">
        <h1>GHProfiles</h1>
        <p>Este app tem como objetivo utilizar um api externa do github para apresentar os profiles e seus respectivos repositórios</p>
        <a href={`https://github.com/login/oauth/authorize?client_id=${process.env.REACT_APP_CLIENT_ID}&redirect_uri=${redirectUri}`}>login</a>
      </header>
      <div className="container">
        <form onSubmit={handleSearch}  >
          <h2 className="text-label"></h2>
          <div className="grid-8 form-container">
            <input
              type="text"
              placeholder="LeonardoVita"
              value={inputUserName}
              onChange={e => setInputUserName(e.target.value)}
            />
            <button type="submit"><BiSearchAlt className="search-icon" size="26" color="#fff" /></button>
          </div>
        </form>
      </div>
      <div className="container profile-container">

        <div className="grid-4">
          <img src={imgURL} alt="teste" className="avatar-img" />
        </div>
        <div className="grid-6 info-container">
          <p>Nome: {name}</p>
          <p>Username: {userName}</p>
          <p>Followers: {followers}</p>
          <p>Public Repos: {repo}</p>
        </div>
        <div className="grid-6 rep-container">
          <h2>Novos repositorios</h2>
          <a href="#">github-profiles</a>
          <a href="#">GitHub-Status-Server</a>
          <a href="#">SemanaOmnistack11</a>
          <a href="#">doe-sangue</a>
        </div>

      </div>
    </div>
  )
}