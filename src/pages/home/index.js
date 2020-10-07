import React, { useState, useEffect } from 'react';
import { github, backend } from '../../services/api'
import { BiSearchAlt } from 'react-icons/bi'
import './styles.css'

export default function Home() {

  const [inputUserName, setInputUserName] = useState('');

  // DADOS DO USUARIO RECEBIDOS DA API 
  const [name, setName] = useState('')
  const [followers, setFollowers] = useState(0)
  const [repoCount, setRepoCount] = useState(0)
  const [gistsCount, setGistsCount] = useState(0)
  const [imgURL, setimgURL] = useState('')
  const [email, setEmail] = useState('')
  const [updatedAt, setUpdatedAt] = useState('')
  const [repo, setRepo] = useState([])


  // useEffect(() => {
  //   getData("LeonardoVita")
  // }, [])


  // function handleSearch(e) {
  //   e.preventDefault()
  //   getData(inputUserName)
  // }

  // function getData(inputName) {
  //   github.get(`/users/${inputName}`, {
  //     params: {
  //       client_id: process.env.REACT_APP_CLIENT_ID,
  //       client_secret: process.env.REACT_APP_CLIENT_SECRET
  //     }
  //   }).then(res => {
  //     const data = res.data

  //     setName(data.name)
  //     setFollowers(data.followers)
  //     setRepoCount(data.public_repos)
  //     setGistsCount(data.public_gists)
  //     setimgURL(data.avatar_url)
  //     setEmail(data.email)
  //     setUpdatedAt(data.updated_at)
  //   })

  //   github.get(`/users/${inputName}/repos?per_page=8&sort=created`, {
  //     params: {
  //       client_id: process.env.REACT_APP_CLIENT_ID,
  //       client_secret: process.env.REACT_APP_CLIENT_SECRET
  //     }
  //   }).then(res => {
  //     const data = res.data
  //     setRepo(data)
  //   })

  // }

  // async function handleLogin() {
  //   const res = await backend.get('/login/github').catch((err) => { console.log({ err }) })

  //   console.log(res)
  // }

  return (
    <div>
      <header className="header-container">
        <div className="container">
          <h1>GHProfiles</h1>
          <p>Este app tem como objetivo utilizar um api externa do github para apresentar os profiles e seus respectivos repositórios</p>
        </div>
      </header>
      <div className="container">

        <form onSubmit={() => alert('handleSearch')}  >
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
          <img src={imgURL || "https://www.lifestylesolutionsbyworldmark.com/img/global/icon-user.svg"} alt="profile avatar" className="avatar-img" />
          <h2>{name || "Github user name"}</h2>
        </div>
        <div className="grid-16 info-container">
          <p>Followers: {followers || 0} </p>
          <p>Repos: {repoCount || 0}</p>
          <p>Gists: {gistsCount || 0}</p>
          <p>{email}</p>
          <p>Ultima atualização: {updatedAt || 0}</p>
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