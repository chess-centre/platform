import React, { lazy } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { ToastProvider } from "react-toast-notifications";
import { AuthProvider } from "./context/Auth";
import AppRoutes from "./components/Navigation/AppRoute";
import AOS from "aos";
import routes from "./routes";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";

// This is the publishable key, so it's ok to include directly.
// Will need to dynamically pass this once we have a production key.
const stripePromise = loadStripe(
  "pk_test_51ISWSYHSMP8H4TL9aCSlDl8OLfmuBAfUnkOCCENqvHSYzONYxSyMURq2YhnXVZHoyg8X8S7x3dDE4pfpGs03MeLb00E9DOqtMY"
);

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
      <Elements stripe={stripePromise}>
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
      </Elements>
    </AuthProvider>
  );
}

export default App;
