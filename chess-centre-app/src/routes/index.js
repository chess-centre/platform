import { lazy } from "react";

const routes = [
  {
    path: "/",
    component: lazy(() => import("../pages/Home/LandingPage")),
    isPrivate: false,
    exact:true
  },
  {
    path: "/login",
    component: lazy(() => import("../pages/Auth/Login")),
    isPrivate: false,
  },
  {
    path: "/register",
    component: lazy(() => import("../pages/Auth/CreateAccount")),
    exact:true,
    isPrivate: false,
  },
  {
    path: "/register/confirm",
    component: lazy(() => import("../pages/Auth/ConfirmEmail")),
    exact:true,
    isPrivate: false,
  },
  {
    path: "/forgot-password",
    component: lazy(() => import("../pages/Auth/ForgotPassword")),
    isPrivate: false,
  },
  {
    path: "/our-mission",
    component: lazy(() => import("../pages/Home/OurMission")),
    isPrivate: false,
  },
  {
    path: "/events",
    component: lazy(() => import("../pages/Home/Events")),
    isPrivate: false,
  },
  {
    path: "/membership",
    component: lazy(() => import("../pages/Home/Membership")),
    isPrivate: false,
  },
  {
    path: "/about",
    component: lazy(() => import("../pages/Home/About")),
    isPrivate: false,
  },
  {
    path: "/code-of-conduct",
    component: lazy(() => import("../pages/Home/CodeOfConduct")),
    isPrivate: false,
  },
  // Authenticated Routes
  {
    path: "/app",
    component: lazy(() => import("../containers/Layout")),
    isPrivate: true,
  }
];

export default routes;



