import React, { lazy } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { AuthProvider } from "./context/Auth";
import AppRoutes from "./components/AppRoute";
import AOS from "aos";
import routes from "./routes";

const Page404 = lazy(() => import("./pages/Error/404"));

function App() {
  React.useEffect(() => {
    AOS.init({
      once: true,
      disable: "phone",
      duration: 750,
      easing: "ease-out-quart",
    });
  });

  return (
    <AuthProvider>
      <Router>
        <Switch>
          {routes.map((route, index) => (
            <AppRoutes
              key={route.path + index}
              path={route.path}
              component={route.component}
              isPrivate={route.isPrivate}
              exact={route.exact}
            />
          ))}
          <Route component={Page404} />
        </Switch>
      </Router>
    </AuthProvider>
  );
}

export default App;
