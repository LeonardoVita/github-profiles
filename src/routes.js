import React from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'

import Home from './pages/home'
import Repo from './pages/repo'

export default function Routes() {
  return (
    <BrowserRouter>
      <Switch>

        <Route exact path="/" component={Home} />
        <Route path="/repo" component={Repo} />

      </Switch>
    </BrowserRouter>
  )
}

