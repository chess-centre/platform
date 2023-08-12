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
const STRIPE_KEY = process.env.REACT_APP_STRIPE_KEY || "";

const stripePromise = loadStripe(STRIPE_KEY);
const queryClient = new QueryClient();
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
