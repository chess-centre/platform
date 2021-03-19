import React, { useContext, Suspense, useEffect, lazy } from "react";
import { Switch, Route, Redirect, useLocation } from "react-router-dom";
//import routes from "../routes";

import Sidebar from "../components/Sidebar";
import Header from "../components/AuthHeader.js";
import Main from "../containers/Main";

import ThemedSuspense from "../components/ThemedSuspense";
import { SidebarContext } from "../context/SidebarContext";

// use lazy for better code splitting, a.k.a. load faster
const Dashboard = lazy(() => import("../pages/Dashboard/Dashboard"));
const Events = lazy(() => import("../pages/Dashboard/Events"));
const Results = lazy(() => import("../pages/Dashboard/Results"));
const Members = lazy(() => import("../pages/Dashboard/Members"));
const Profile = lazy(() => import("../pages/User/Profile"));

const routes = [
  {
    path: "/dashboard",
    component: Dashboard,
  },
  {
    path: "/events",
    component: Events,
  },
  {
    path: "/results",
    component: Results,
  },
  {
    path: "/members",
    component: Members,
  },
  {
    path: "/profile",
    component: Profile,
  }
];

const Page404 = lazy(() => import("../pages/404"));

function Layout() {
  const { isSidebarOpen, closeSidebar } = useContext(SidebarContext);
  let location = useLocation();

  useEffect(() => {
    // eslint-disable-next-line react-hooks/exhaustive-deps
    closeSidebar();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location]);

  return (
    <div
      className={`flex h-screen bg-gray-50 dark:bg-gray-900 ${
        isSidebarOpen && "overflow-hidden"
      }`}
    >
      <Sidebar />

      <div className="flex flex-col flex-1 w-full">
        <Header />
        <Main>
          <Suspense fallback={<ThemedSuspense />}>
            <Switch>
              {routes.map((route, i) => {
                return route.component ? (
                  <Route
                    key={i}
                    exact={true}
                    path={`/app${route.path}`}
                    render={(props) => <route.component {...props} />}
                  />
                ) : null;
              })}
              <Redirect exact from="/app" to="/app/dashboard" />
              <Route component={Page404} />
            </Switch>
          </Suspense>
        </Main>
      </div>
    </div>
  );
}

export default Layout;
