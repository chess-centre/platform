import { lazy } from "react";

const routes = [
  {
    path: "/",
    component: lazy(() => import("../pages/Home/Home")),
    isPrivate: false,
    exact: true,
  },
  {
    path: "/login",
    component: lazy(() => import("../pages/Auth/Login")),
    isPrivate: false,
  },
  // {
  //   path: "/register",
  //   component: lazy(() => import("../pages/Auth/Register")),
  //   exact: true,
  //   isPrivate: false,
  // },
  // {
  //   path: "/register/confirm/:email",
  //   component: lazy(() => import("../pages/Auth/ConfirmEmail")),
  //   exact: true,
  //   isPrivate: false,
  // },
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
    path: "/events/club",
    component: lazy(() => import("../pages/Events/ClubNight")),
    isPrivate: false,
    exact: false
  },
  {
    path: "/events/match",
    component: lazy(() => import("../pages/Events/MatchNight")),
    isPrivate: false,
    exact: false
  },
  {
    path: "/events/junior-club",
    component: lazy(() => import("../pages/Events/JuniorClub")),
    isPrivate: false
  },
  {
    path: "/events/junior-rapidplay/:id",
    component: lazy(() => import("../pages/Events/JuniorRapidplay")),
    isPrivate: false
  },
  {
    path: "/events/igs-junior/:id",
    component: lazy(() => import("../pages/Events/JuniorCustom")),
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
    path: "/events/im-norm-seekers",
    component: lazy(() => import("../pages/Events/Norm")),
    isPrivate: false
  },
  {
    path: "/events/blitz/:id",
    component: lazy(() => import("../pages/Events/Blitz")),
    isPrivate: false
  },
  {
    path: "/events/festival/:id",
    component: lazy(() => import("../pages/Home/Festival")),
    exact: true,
    isPrivate: false,
  },
  {
    path: "/events/festival/blitz/:id",
    component: lazy(() => import("../pages/Events/FestivalBlitz")),
    isPrivate: false
  },
  {
    path: "/events",
    component: lazy(() => import("../pages/Home/Events")),
    isPrivate: false,
  },
  // {
  //   path: "/membership",
  //   component: lazy(() => import("../pages/Home/Membership")),
  //   isPrivate: false,
  // },
  {
    path: "/more-info",
    component: lazy(() => import("../pages/Home/MoreInfo")),
    isPrivate: false,
  },
  {
    path: "/faqs",
    component: lazy(() => import("../pages/Home/FAQs")),
    isPrivate: false,
  },
  // {
  //   path: "/about",
  //   component: lazy(() => import("../pages/Home/About")),
  //   isPrivate: false,
  // },
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
  {
    path: "/developer",
    component: lazy(() => import("../pages/Home/Developer")),
    isPrivate: false,
  },
  // Authenticated Routes (see `src/containers/Layout` for nested routes)
  {
    path: "/app",
    component: lazy(() => import("../containers/Layout")),
    isPrivate: true,
  },
  {
    path: "/broadcast/live",
    component: lazy(() => import("../pages/Broadcast/Live")),
    exact: true,
    isPrivate: false,
  },
  // Widgets
  {
    path: "/widgets/event/:eventId",
    component: lazy(() => import("../widgets/Event")),
    isPrivate: false
  },
];

export default routes;
