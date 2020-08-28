import React from 'react';
import { BiSearchAlt } from 'react-icons/bi'
import './styles.css'


export default function Home() {
  return (
    <div>
      <header className="header-container">
        <h1>GHProfiles</h1>
        <p>Este app tem como objetivo utilizar um api externa do github para apresentar os profiles e seus respectivos repositórios</p>
      </header>
      <div className="container">
        <form action="" >
          <h2 className="text-label"></h2>
          <div>
            <input type="text" placeholder="LeonardoVita" />
            <button type="submit"><BiSearchAlt className="search-icon" size="26" color="#fff" /></button>
          </div>
        </form>
      </div>
      <div className="container profile-container">
        <img src="" alt="" />
        <div className="info-container">
          <p>Nome: Leonardo Vita</p>
          <p>Username: LeonardoVita</p>
          <p>Followers: 11</p>
          <p>Repositorios count: 12</p>
        </div>
        <div className="rep-container">
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