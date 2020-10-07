import React from 'react'
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom'
import { isAuthenticated } from './auth'

import Home from './pages/home'
import Login from './pages/login'
import Callback from './pages/oAuthCallback'
import Repos from './pages/repos'


const PrivateRoute = ({ component: Component, ...rest }) => {
  return (
    <Route {...rest}
      render={props => (
        isAuthenticated() ? (
          <Component {...props} />
        ) : (
            <Redirect to={{ pathname: '/login', state: { from: props.location } }} />
          )
      )} />
  )
}

export default function Routes() {
  return (
    <BrowserRouter>
      <Switch>

        <PrivateRoute exact path="/" component={Home} />
        <Route path="/login" component={Login} />
        <PrivateRoute path="/login/callback" component={Callback} />
        <PrivateRoute path="/repos" component={() => <h1>vc esta logado</h1>} />

      </Switch>
    </BrowserRouter>
  )
}

