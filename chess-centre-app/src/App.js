import React, { lazy } from "react";
import {
  BrowserRouter as Router,
  Switch
} from "react-router-dom";
import AccessibleNavigationAnnouncer from "./components/AccessibleNavigationAnnouncer";
import { AuthProvider } from "./context/Auth";
import AppRoutes from "./components/AppRoute";

const Layout = lazy(() => import("./containers/Layout"));
const Login = lazy(() => import("./pages/Auth/Login"));
const Home = lazy(() => import("./pages/Home/LandingPage"));
const CreateAccount = lazy(() => import("./pages/Auth/CreateAccount"));
const ForgotPassword = lazy(() => import("./pages/Auth/ForgotPassword"));
const ConfirmEmail = lazy(() => import("./pages/Auth/ConfirmEmail"));
const routes = [
  {
    path: "/",
    component: Home,
    isPrivate: false,
    exact:true
  },
  {
    path: "/login",
    component: Login,
    isPrivate: false,
  },
  {
    path: "/register",
    component: CreateAccount,
    isPrivate: false,
  },
  {
    path: "/register/confirm",
    component: ConfirmEmail,
    isPrivate: false,
  },
  {
    path: "/forgot-password",
    component: ForgotPassword,
    isPrivate: false,
  },
  {
    path: "/app",
    component: Layout,
    isPrivate: true,
  }
];
 
function App() {
  return (
    <AuthProvider>
      <Router>
        <AccessibleNavigationAnnouncer />
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
        </Switch>
      </Router>
    </AuthProvider>
  )
}

export default App
