import React, { lazy } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { ToastProvider } from "react-toast-notifications";
import { AuthProvider } from "./context/Auth";
import AppRoutes from "./components/Navigation/AppRoute";
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
      <ToastProvider>
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
      </ToastProvider>
    </AuthProvider>
  );
}

export default App;
