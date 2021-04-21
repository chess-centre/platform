import { lazy } from "react";

const routes = [
  {
    path: "/",
    component: lazy(() => import("../pages/Home/Home")),
    isPrivate: false,
    exact: true,
  },
  {
    path: "/shop",
    component: lazy(() => import("../pages/Shop/Shop")),
    isPrivate: false,
  },
  {
    path: "/login",
    component: lazy(() => import("../pages/Auth/Login")),
    isPrivate: false,
  },
  {
    path: "/register",
    component: lazy(() => import("../pages/Auth/CreateAccount")),
    exact: true,
    isPrivate: false,
  },
  {
    path: "/register/confirm/:email",
    component: lazy(() => import("../pages/Auth/ConfirmEmail")),
    exact: true,
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
    path: "/events/junior/:id",
    component: lazy(() => import("../pages/Events/Junior")),
    isPrivate: false
  },
  {
    path: "/events/congress/:id",
    component: lazy(() => import("../pages/Events/Congress")),
    isPrivate: false
  },
  {
    path: "/events/rapidplay/:id",
    component: lazy(() => import("../pages/Events/Rapidplay")),
    isPrivate: false
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
  {
    path: "/roadmap",
    component: lazy(() => import("../components/Roadmap")),
    isPrivate: false,
  },
  // Authenticated Routes (see `src/containers/Layout` for nested routes)
  {
    path: "/app",
    component: lazy(() => import("../containers/Layout")),
    isPrivate: true,
  },
  {
    path: "/internal/live",
    component: lazy(() => import("../pages/Broadcast/Internal")),
    exact: true,
    isPrivate: true,
    isAdmin: true
  },
  {
    path: "/broadcast/live",
    component: lazy(() => import("../pages/Broadcast/Live")),
    exact: true,
    isPrivate: true,
  },
];

export default routes;
