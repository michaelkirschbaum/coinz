import React, { useState } from 'react'
import {
  Route,
  Switch,
  Redirect,
} from 'react-router-dom'
import { hot } from 'react-hot-loader'
import Header from 'components/Header'
import Login from 'components/Login'
import Account from 'components/Account'
import PropTypes from 'prop-types'

export const UserContext = React.createContext('Alice')

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

const App = () => {
  const [user, setUser] = useState('')
  const userHandler = (user) => {
    setUser(user)
  }

  return (
    <UserContext.Provider value={user}>
      {user ? <Header setUser={userHandler} /> : null}
      <Switch>
        <Route
          path='/login'
          render={() => <Login setUser={userHandler} />}
        />
        <ProtectedRoute
          exact path='/'
          component={Account}
          auth={user}
        />
      </Switch>
    </UserContext.Provider>
  )
}

ProtectedRoute.propTypes = {}

export default hot(module)(App)