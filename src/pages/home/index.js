import React, { useState, useEffect } from 'react';
import { backend } from '../../services/api'
import { BiSearchAlt } from 'react-icons/bi'
import './styles.css'

export default function Home() {

  const [inputUserName, setInputUserName] = useState('');

  // DADOS DO USUARIO RECEBIDOS DA API   
  const [profile, setProfile] = useState({
    name: '',
    imgURL: '',
    email: '',
    updateAt: 0,
    followers: 0,
    repoCount: 0,
    gistsCount: 0
  })
  const [repo, setRepo] = useState([])

  const access_token = window.localStorage.getItem('access_token')
  const token_type = window.localStorage.getItem('token_type')
  const { login } = JSON.parse(window.localStorage.getItem('user_data'))

  useEffect(() => {
    getData(login)
  }, [])

  function handleSearch(e) {
    e.preventDefault()
    getData(inputUserName)
  }

  function dataFormatada(date) {
    var data = new Date(date),
      dia = data.getDate().toString().padStart(2, '0'),
      mes = (data.getMonth() + 1).toString().padStart(2, '0'), //+1 pois no getMonth Janeiro começa com zero.
      ano = data.getFullYear(),
      hora = data.getHours().toString().padStart(2, '0'),
      minuto = data.getMinutes().toString().padStart(2, '0'),
      segundo = data.getSeconds().toString().padStart(2, '0');
    return dia + "/" + mes + "/" + ano + "  " + hora + ":" + minuto + ":" + segundo;
  }

  function getData(inputName) {
    backend.get(`/users/${inputName}`, {
      params: {
        'access_token': access_token,
        'token_type': token_type
      }
    }).then(res => {
      const data = res.data

      const updated_at = dataFormatada(res.data.updated_at)
      console.log({ updated_at })

      setProfile({
        ...profile,
        name: data.name,
        imgURL: data.avatar_url,
        email: data.email,
        updatedAt: updated_at,
        followers: data.followers,
        repoCount: data.public_repos,
        gistsCount: data.public_gists,
      })

    })

    backend.get(`/users/${inputName}/repos?per_page=8&sort=created`, {
      params: {
        'access_token': access_token,
        'token_type': token_type
      }
    }).then(res => {
      const data = res.data
      setRepo(data)
    })

  }


  return (
    <div>
      <header className="header-container">
        <div className="container">
          <h1>GHProfiles</h1>
          <p>Este app tem como objetivo utilizar um api externa do github para apresentar os profiles e seus respectivos repositórios</p>
        </div>
      </header>
      <div className="container">

        <form onSubmit={e => handleSearch(e)}>
          <div className="grid-8 form-container">
            <input
              type="text"
              placeholder={login}
              value={inputUserName}
              onChange={e => setInputUserName(e.target.value)}
            />
            <button type="submit"><BiSearchAlt className="search-icon" size="26" color="#fff" /></button>
          </div>
        </form>
      </div>
      <div className="container profile-container">

        <div className="img-cantainer grid-16">
          <img src={profile.imgURL || "https://www.lifestylesolutionsbyworldmark.com/img/global/icon-user.svg"} alt="profile avatar" className="avatar-img" />
          <h2>{profile.name || "Github user name"}</h2>
        </div>
        <div className="grid-16 info-container">
          <p>Followers: {profile.followers || 0} </p>
          <p>Repos: {profile.repoCount || 0}</p>
          <p>Gists: {profile.gistsCount || 0}</p>
          <p>{profile.email}</p>
          <p>Ultima atualização: {profile.updatedAt || 0}</p>
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