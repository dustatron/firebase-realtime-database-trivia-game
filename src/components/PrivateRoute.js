import React from "react";
import { Route, Redirect } from "react-router-dom";
import { useUserLogin } from "../context/UserContext";
const PrivateRoute = ({ component: Component, ...rest }) => {
  const user = useUserLogin();
  return (
    <Route
      {...rest}
      render={(props) =>
        user.loggedIn ? <Component {...props} /> : <Redirect to="/login" />
      }
    />
  );
};

export default PrivateRoute;
