import React from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'

import Home from './pages/home'
import Callback from './pages/oAuthCallback'
import Repos from './pages/Repos'

export default function Routes() {
  return (
    <BrowserRouter>
      <Switch>

        <Route exact path="/" component={Home} />
        <Route path="/login/callback" component={Callback} />
        <Route path="/repos" component={Repos} />

      </Switch>
    </BrowserRouter>
  )
}

