import React, { useContext } from "react";
import { Route, Redirect } from "react-router-dom";
import { globalStateContext } from "../../context/GlobalContext";

const PrivateRoute = ({ component: Component, ...rest }) => {
  const { isloggedIn } = useContext(globalStateContext);
  return (
    <Route
      {...rest}
      render={(props) =>
        isloggedIn ? <Component {...props} /> : <Redirect to="/login" />
      }
    />
  );
};

export default PrivateRoute;
