import React, { useContext, Suspense, useEffect, useState, lazy } from "react";
import { Switch, Route, Redirect, useLocation } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import Header from "../components/Navigation/AuthHeader";
import Main from "./Main";
import ThemedSuspense from "../components/ThemedSuspense";
import { SidebarContext } from "../context/SidebarContext";
import { isAdmin } from "../context/Auth";

const routes = [
  {
    path: "/dashboard",
    component: lazy(() => import("../pages/App/Dashboard")),
  },
  {
    path: "/events/:eventId",
    component: lazy(() => import("../pages/App/EventInfo")),
  },
  {
    path: "/events",
    component: lazy(() => import("../pages/App/Events")),
    exact: true
  },
  {
    path: "/calendar",
    component: lazy(() => import("../pages/App/Calendar")),
  },
  {
    path: "/results",
    component: lazy(() => import("../pages/App/Results")),
  },
  {
    path: "/players",
    component: lazy(() => import("../pages/App/Players")),
  },
  {
    path: "/juniors",
    component: lazy(() => import("../pages/App/Juniors")),
  },
  {
    path: "/faqs",
    component: lazy(() => import("../pages/App/FAQs")),
  },
  {
    path: "/upgrade",
    component: lazy(() => import("../pages/App/Upgrade")),
  },
  {
    path: "/roadmap",
    component: lazy(() => import("../pages/App/Roadmap")),
  },
  {
    path: "/profile",
    component: lazy(() => import("../pages/App/User/Profile")),
  },
  {
    path: "/games",
    component: lazy(() => import("../pages/App/Games")),
  },
  {
    path: "/games/:memberId",
    component: lazy(() => import("../pages/App/Games")),
  },
  {
    path: "/games/event/:eventId",
    component: lazy(() => import("../pages/App/EventGames")),
  },
  {
    path: "/admin/:id",
    component: lazy(() => import("../pages/Admin")),
    isAdmin: true
  },
];

const Page404 = lazy(() => import("../pages/Error/404"));

function Layout() {
  const { isSidebarOpen, closeSidebar } = useContext(SidebarContext);
  const [adminUser, setAdminUser] = useState(false);
  let location = useLocation();

  useEffect(() => {
    // eslint-disable-next-line react-hooks/exhaustive-deps
    closeSidebar();
    const checkAdmin = async () => {
      const admin = await isAdmin();
      setAdminUser(admin);
    };
    checkAdmin();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location]);

  return (
    <div
      className={`flex h-screen bg-gray-50 dark:bg-gray-900 ${isSidebarOpen && "overflow-hidden"
        }`}
    >
      <Sidebar />

      <div className="flex flex-col flex-1 w-full">
        <Header />
        <Main>
          <Suspense fallback={<ThemedSuspense />}>
            <Switch>
              {routes.map((route, i) => {
                if (route.component) {
                  if (route.isAdmin && !adminUser) {
                    return <Route
                      key={i}
                      exact={true}
                      path={`/app${route.path}`}
                      render={(props) => <Redirect to={{ pathname: "/app/dashboard", state: { from: props.location } }} />}
                    />
                  } else {
                    return <Route
                      key={i}
                      exact={true}
                      path={`/app${route.path}`}
                      render={(props) => <route.component {...props} />}
                    />
                  }
                } else {
                  return null;
                }
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
