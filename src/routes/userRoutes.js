import React from "react";
import { Route, Redirect } from "react-router-dom";
import { isUser } from "../services";

const UserRoute = ({ component: Component, ...rest }) => {
  return (
    <Route
      {...rest}
      render={(props) =>
        isUser() ? <Component {...props} /> : <Redirect to="/login" />
      }
    />
  );
};

export default UserRoute;
