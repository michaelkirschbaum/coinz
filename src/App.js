import React from 'react'
import {
  Route,
  Switch,
  Redirect,
} from 'react-router-dom'
import { hot } from 'react-hot-loader'
import Login from './Login';
import Account from './Account'

const ProtectedRoute = ({ path, component: Component, auth }) => (
  <Route
    {...path}
    render={props => auth ?
      <Component /> :
      <Redirect
        to={{
          pathname: '/login',
          state: { from: props.location }
        }}
      />
    }
  />
)

const App = () => (
  <div>
    <Switch>
      <Route path='/login' component={Login} />
      <ProtectedRoute exact path='/' component={Account} auth={true} />
    </Switch>
  </div>
)

export default hot(module)(App)