import { lazy } from 'react'

// use lazy for better code splitting, a.k.a. load faster
const Dashboard = lazy(() => import('../pages/Dashboard/Dashboard'))
const Events = lazy(() => import('../pages/Dashboard/Events'))
const Results = lazy(() => import('../pages/Dashboard/Results'))
const Members = lazy(() => import('../pages/Dashboard/Members'))
const Profile = lazy(() => import('../pages/User/Profile'))
const Settings = lazy(() => import('../pages/User/Settings'))


const routes = [
  {
    path: '/dashboard',
    component: Dashboard
  },
  {
    path: '/events',
    component: Events
  },
  {
    path: '/results',
    component: Results
  }, 
  {
    path: '/members',
    component: Members
  },
  {
    path: '/profile',
    component: Profile
  },
  {
    path: '/settings',
    component: Settings
  }
]

export default routes
