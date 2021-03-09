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
const Events = lazy(() => import('./pages/Home/Events'));
const OurMission = lazy(() => import('./pages/Home/OurMission'));
const Membership = lazy(() => import('./pages/Home/Membership'));
const About = lazy(() => import('./pages/Home/About'));
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
    path: "/our-mission",
    component: OurMission,
    isPrivate: false,
  },
  {
    path: "/events",
    component: Events,
    isPrivate: false,
  },
  {
    path: "/membership",
    component: Membership,
    isPrivate: false,
  },
  {
    path: "/about",
    component: About,
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
