import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom'
import  backend  from '../../services/api'
import { BiSearchAlt } from 'react-icons/bi'

import './styles.css'

import Header from '../../components/Header/Header';
import Head from '../../components/Head';

export default function Home() {

  let history = useHistory();

  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(false)
  const [logoutModal, setLogoutModal] = useState(false)

  //controlando o input
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

  //coletando dados do usuario logado
  const access_token = window.localStorage.getItem('access_token')
  const token_type = window.localStorage.getItem('token_type')
  const { login } = JSON.parse(window.localStorage.getItem('user_data'))
  
  //tratamento do campo data, para o padrão
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

  useEffect(() => {
    getData(login)
  }, [])  // <<--- React Hook useEffect has missing dependencies: 'getData' and 'login'. Either include them or remove the dependency array.

  async function getData(inputName) {

    try {    
      setLoading(true) 
      setError(false)

      const userResponse = await backend.get(`/users/${inputName}`, {
        params: {
          'access_token': access_token,
          'token_type': token_type
        }
      })
      console.log(userResponse)
      const userData = userResponse.data
      const updated_at = dataFormatada(userResponse.data.updated_at)    
      setProfile({
        ...profile,
        name: userData.name,
        imgURL: userData.avatar_url,
        email: userData.email,
        updatedAt: updated_at,
        followers: userData.followers,
        repoCount: userData.public_repos,
        gistsCount: userData.public_gists,
      })    
  
      const repositoriesResponse = await backend.get(`/users/${inputName}/repos?per_page=8&sort=created`, {
        params: {
          'access_token': access_token,
          'token_type': token_type
        }
      })

      const repositories = repositoriesResponse.data
      setRepo(repositories)  

    } catch (error) {
      setError(error)
      console.error(error)
    }finally{
      setLoading(false)
    }


  } 
  
  function handleSearch(e) {
    e.preventDefault()
    getData(inputUserName)
  }

  function handleLogout(){    
    window.localStorage.removeItem('scope')
    window.localStorage.removeItem('token_type')
    window.localStorage.removeItem('user_data')
    window.localStorage.removeItem('access_token')
    history.push('/')
  }

  //fecha modal caso seja clicado fora do modal
  function closeModal({target}){
    target.className === "modal-background" && setLogoutModal(false)
  }


  return (
    <div>
      <Head title="Home" description="Pesquise pelo nome do usuario github para buscar informações do usuario"/>
      <Header setLogoutModal={setLogoutModal} paragraph="Este app tem como objetivo utilizar um api externa do github para apresentar os profiles e seus respectivos repositórios"/>
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
      {
        loading && <div className="loading"></div>
      }
      {
        error && <div className="error">{error.message + ' - Falha ao carregar os dados do usuario'}</div>
      }
      {
        logoutModal && (
        <div className="modal-background" onClick={(e)=>closeModal(e)}>
          <div className="modal-container" >
            <h2>Fazer logout de usuário?</h2>
            <div className="modal-button-container">
              <button className="modal-button" onClick={()=>handleLogout()}>Sim</button>
              <button className="modal-button" onClick={()=>setLogoutModal(false)}>Não</button>
            </div>         
          </div>
        </div>
        )

      }
      <div className="container rep-container">
        <ul>
          {repo.map(item => {
            return (
              <li key={item.id} className="grid-8">
                <h2 href={item.html_url}>{item.name}</h2>
                <p>{item.description}</p>
              </li>
            )
          })}
        </ul>
      </div>
    </div>
  )
}