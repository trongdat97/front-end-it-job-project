import { Route, Switch } from 'react-router-dom'

import Dashboard from 'features/Admin/screens/Dashboard'
import AdminLogin from 'features/Auth/components/AuthAdmin/AuthAdmin'
import { PrivateRoute, PrivateRouteUser } from 'utils/PrivateRoute'
import Header from 'components/Header/Header'
import ListUser from 'features/Admin/screens/ListUser'
import UserRequest from 'features/Admin/screens/UserRequest'
import DeletedUser from 'features/Admin/screens/DeletedUser'
import TagsScreen from 'features/Admin/screens/TagsScreen'
import RoleScreen from 'features/Admin/screens/RoleScreen'
import ListJob from 'features/Admin/screens/ListJob'
import JobRequest from 'features/Admin/screens/JobRequest'
import DeletedJob from 'features/Admin/screens/DeletedJob'
import UserLogin from 'features/Auth/components/AuthUser/UserLogin'
import UserSignup from 'features/Auth/components/AuthUser/UserSignup'
import NavBar from 'features/User/components/NavBar/NavBar'
import ContributorScreen from 'features/User/screens/ContributorScreen'
import PermissionScreen from 'features/Admin/screens/PermissionScreen'
function App() {
  return (
    <div>
      <Header />
      <Switch>
        <Route path="/admin/login" exact component={AdminLogin} />
        <PrivateRoute path="/admin/dashboard" exact component={Dashboard} />
        <PrivateRoute path="/admin/user/list" exact component={ListUser} />
        <PrivateRoute
          path="/admin/user/request"
          exact
          component={UserRequest}
        />
        <PrivateRoute
          path="/admin/user/deleted"
          exact
          component={DeletedUser}
        />
        <PrivateRoute path="/admin/tags" exact component={TagsScreen} />
        <PrivateRoute path="/admin/role" exact component={RoleScreen} />
        <PrivateRoute
          path="/admin/permission"
          exact
          component={PermissionScreen}
        />
        <PrivateRoute path="/admin/jobs/list" exact component={ListJob} />
        <PrivateRoute path="/admin/jobs/request" exact component={JobRequest} />
        <PrivateRoute path="/admin/jobs/deleted" exact component={DeletedJob} />
        <Route path="/login" exact component={UserLogin} />
        <Route path="/signup" exact component={UserSignup} />
        <Route path="/" exact component={NavBar} />
        <PrivateRouteUser path="/home" exact component={ContributorScreen} />
      </Switch>
    </div>
  )
}

export default App
