import React from "react";
import { Route, Redirect } from "react-router-dom";
import { isAdmin, isUser } from "../services";

const PublicRoute = ({ component: Component, restricted, ...rest }) => {
  return (
    <Route
      {...rest}
      render={(props) =>
        isAdmin() && restricted ? (
          <Redirect to="/list-employees" />
        ) : isUser() && restricted ? (
          <Redirect to="/task-list" />
        ) : (
          <Component {...props} />
        )
      }
    />
  );
};

export default PublicRoute;
