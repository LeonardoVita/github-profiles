import React, { useState, useEffect } from 'react';
import api from '../../services/api'
import { BiSearchAlt } from 'react-icons/bi'

import './styles.css'

export default function Home() {

  const [name, setName] = useState('')
  const [inputUserName, setInputUserName] = useState('')
  const [followers, setFollowers] = useState(0)
  const [repoCount, setRepoCount] = useState(0)
  const [gistsCount, setGistsCount] = useState(0)
  const [imgURL, setimgURL] = useState('')
  const [email, setEmail] = useState('')
  const [updatedAt, setUpdatedAt] = useState('')

  const [repo, setRepo] = useState([])

  const redirectUri = "http://localhost:3000/repo";



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
      setFollowers(data.followers)
      setRepoCount(data.public_repos)
      setGistsCount(data.public_gists)
      setimgURL(data.avatar_url)
      setEmail(data.email)
      setUpdatedAt(data.updated_at)
    })

    api.get(`users/${inputName}/repos?per_page=8&sort=created`, {
      params: {
        client_id: process.env.REACT_APP_CLIENT_ID,
        client_secret: process.env.REACT_APP_CLIENT_SECRET
      }
    }).then(res => {
      const data = res.data
      console.log(res)

      setRepo(data)
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
        <div className="container">
          <h1>GHProfiles</h1>
          <p>Este app tem como objetivo utilizar um api externa do github para apresentar os profiles e seus respectivos repositórios</p>
          <a href={`https://github.com/login/oauth/authorize?client_id=${process.env.REACT_APP_CLIENT_ID}&redirect_uri=${redirectUri}`}>login</a>
        </div>
      </header>
      <div className="container">

        <form onSubmit={handleSearch}  >
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

        <div className="img-cantainer grid-16">
          <img src={imgURL} alt="teste" className="avatar-img" />
          <h2>{name}</h2>
        </div>
        <div className="grid-16 info-container">
          <p>Followers: {followers}</p>
          <p>Repos: {repoCount}</p>
          <p>Gists: {gistsCount}</p>
          <p>{email}</p>
          <p>Ultima atualização: {updatedAt}</p>
        </div>
      </div>

      <div className="container rep-container">
        <ul>
          {repo.map(item => {
            return (
              <li key={item.id} className="grid-8">
                <a href={item.html_url}>{item.name}</a>
                <p>{item.description}</p>
              </li>
            )
          })}
        </ul>
      </div>
    </div>
  )
}