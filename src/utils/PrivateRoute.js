import storageAdmin from 'constants/storageAdmin'
import storageUser from 'constants/storageUser'
import { Redirect, Route } from 'react-router-dom'

export const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={(props) =>
      !localStorage.getItem(storageAdmin.TOKEN) ||
      sessionStorage.getItem(storageAdmin.TOKEN) ? (
        <Component {...props} />
      ) : (
        <Redirect
          to={{ pathname: '/admin/login', state: { from: props.location } }}
        />
      )
    }
  />
)

export const PrivateRouteUser = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={(props) =>
      localStorage.getItem(storageUser.TOKEN) ||
      sessionStorage.getItem(storageUser.TOKEN) ? (
        <Component {...props} />
      ) : (
        <Redirect
          to={{ pathname: '/login', state: { from: props.location } }}
        />
      )
    }
  />
)
