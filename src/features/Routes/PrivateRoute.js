import React from 'react';
import { useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';

import RouteWithLayout from './RouteWithLayout';

const PrivateRoute = (props) => {
  const { layout, component, path, roles, ...rest } = props;
  const { user, isAuthenticated } = useSelector(
    (state) => state.authentication
  );

  if (!isAuthenticated) {
    return <Redirect to="/login" />;
  }

  const userRoles = user.roles.map((role) => role.id);

  return roles &&
    !roles.filter((element) => userRoles.includes(element)).length ? (
    <Redirect to="/forbidden" />
  ) : (
    <RouteWithLayout
      component={component}
      layout={layout}
      path={path}
      {...rest}
    />
  );
};

PrivateRoute.propTypes = {
  component: PropTypes.any.isRequired,
  layout: PropTypes.any.isRequired,
  path: PropTypes.string.isRequired,
  roles: PropTypes.array,
};

export default PrivateRoute;
