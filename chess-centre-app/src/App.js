import React, { lazy } from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import AccessibleNavigationAnnouncer from './components/AccessibleNavigationAnnouncer'

const Layout = lazy(() => import('./containers/Layout'))
const Login = lazy(() => import('./pages/Auth/Login'))
const Home = lazy(() => import('./pages/Home/LandingPage'));
const CreateAccount = lazy(() => import('./pages/Auth/CreateAccount'))
const ForgotPassword = lazy(() => import('./pages/Auth/ForgotPassword'))

function App() {
  return (
    <>
      <Router>
        <AccessibleNavigationAnnouncer />
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/login" component={Login} />
          <Route path="/register" component={CreateAccount} />
          <Route path="/forgot-password" component={ForgotPassword} />
          <Route path="/app" component={Layout} />
        </Switch>
      </Router>
    </>
  )
}

export default App
