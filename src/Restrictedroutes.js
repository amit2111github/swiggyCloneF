import React from 'react'
import { Redirect, Route } from 'react-router-dom'
import { getUser } from './apicaller'
const Restrictedroute = ({ component: Component, ...rest }) => {
  const user = getUser()
  return (
    <Route
      {...rest}
      render={(props) =>
        user ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{
              pathname: '/',
              state: { from: props.location }
            }}
          />
        )
      }
    />
  )
}

export default Restrictedroute
