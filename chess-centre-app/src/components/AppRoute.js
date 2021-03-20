import React from "react";
import { Redirect, Route } from "react-router-dom";
import { useAuthState } from "../context/Auth";

const AppRoutes = ({ component: Component, path, isPrivate, ...rest }) => {
  const userDetails = useAuthState();

  if (isPrivate) {
    return (
      <Route
        path={path}
        render={(props) =>
          userDetails.token ? (
            <Component {...props} />
          ) : (
            <Redirect to={{ pathname: "/login" }} />
          )
        }
        {...rest}
      />
    );
  } else {
    return (
      <Route
        path={path}
        render={(props) => {
          return <Component {...props} />;
        }}
        {...rest}
      />
    );
  }
};

export default AppRoutes;
