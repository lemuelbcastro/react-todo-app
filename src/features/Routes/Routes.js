import React from 'react';
import { Router, Switch, Redirect } from 'react-router-dom';

import history from 'utils/history';
import roles from 'utils/roles';
import PublicRoute from './PublicRoute';
import PrivateRoute from './PrivateRoute';
import { Main, Minimal } from '../Layout';
import Login from '../Login';
import Dashboard from '../Dashboard';
import { Forbidden, NotFound, ServerError } from '../Error';

const Routes = () => {
  return (
    <Router history={history}>
      <Switch>
        <Redirect exact from="/" to="/dashboard" />
        <PrivateRoute
          component={Dashboard}
          exact
          layout={Main}
          path="/dashboard"
          roles={[roles.user, roles.admin]}
        />
        <PublicRoute
          component={Login}
          exact
          layout={Minimal}
          path="/login"
          restricted={true}
        />
        <PublicRoute
          component={Forbidden}
          exact
          layout={Minimal}
          path="/forbidden"
        />
        <PublicRoute
          component={NotFound}
          exact
          layout={Minimal}
          path="/not-found"
        />
        <PublicRoute
          component={ServerError}
          exact
          layout={Minimal}
          path="/server-error"
        />
        <Redirect to="/not-found" />
      </Switch>
    </Router>
  );
};

export default Routes;
