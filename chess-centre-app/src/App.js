import React, { lazy, useEffect } from "react";
import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "react-query";
import { ToastProvider } from "react-toast-notifications";
import { AuthProvider } from "./context/Auth";
import { LiveGameProvider } from "./context/LiveGameContext";
import AppRoutes from "./components/Navigation/AppRoute";
import routes from "./routes";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import ReactGA from "react-ga";

if (process.env.NODE_ENV === "production") {
  const trackingId = "UA-194757154-1";
  ReactGA.initialize(trackingId);
}
const FESTIVAL_ID = process.env.REACT_APP_FESTIVAL_ID || "8142eecc-cebc-401f-ae7c-ce90be22798c";

const queryClient = new QueryClient();
const STRIPE_KEY =
  process.env.REACT_APP_STRIPE_KEY ||
  "pk_test_51ISWSYHSMP8H4TL9aCSlDl8OLfmuBAfUnkOCCENqvHSYzONYxSyMURq2YhnXVZHoyg8X8S7x3dDE4pfpGs03MeLb00E9DOqtMY";
const stripePromise = loadStripe(STRIPE_KEY);
const Page404 = lazy(() => import("./pages/Error/404"));

export default function App() {

  useEffect(() => {
    if (process.env.NODE_ENV === "production") {
      ReactGA.pageview(window.location.pathname + window.location.search);
    }
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <LiveGameProvider>
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
                  <Redirect exact from="/festival" to={`/events/festival/${FESTIVAL_ID}`} />
                  <Route component={Page404} />
                </Switch>
              </Router>
            </ToastProvider>
          </Elements>
        </LiveGameProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
}
