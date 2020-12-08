import React from "react";
import { Route, Redirect } from "react-router-dom";

const PublicRoutes = ({ user, component: Com, ...rest }) => {
  return (
    <Route
      {...rest}
      component={(props) =>
        rest.restricted ? (
          user ? (
            <Redirect to="/dashboard" />
          ) : (
            <Com {...props} user={user} />
          )
        ) : (
          <Com {...props} user={user} />
        )
      }
    />
  );
};

export default PublicRoutes;
