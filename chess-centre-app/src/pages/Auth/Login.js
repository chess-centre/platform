import React, { useState } from 'react'
import { Link } from 'react-router-dom'

import ImageLight from '../../assets/img/chess-player.jpg'
import ImageDark from '../../assets/img/chess-players.jpg'
import Logo from '../../assets/img/logo.png';
import { GithubIcon } from '../../icons'
import { Label, Input, Button } from '@windmill/react-ui'
import { loginUser, useAuthDispatch, useAuthState } from '../../context/Auth';



// AWS.config.region = 'us-east-2'; // Region
// AWS.config.credentials = new AWS.CognitoIdentityCredentials({
//     IdentityPoolId: 'us-east-2:deb30f6e-2433-4c9f-bc6e-a17ca2c54e44',
// });

function Login(props) {

  const [Email, setEmail] = useState("")
  const [Password, setPassword] = useState("")

  const dispatch = useAuthDispatch();
  const { loading, errorMessage } = useAuthState();

  async function signIn() {
    try {
      let response = await loginUser(dispatch, Email, Password); 
      if (response) {
        props.history.push('/app');
      }
      else{
        return
      }

    } catch (error) {
      console.log(error);
    }
  } 
  return (
    <div className="flex items-center min-h-screen p-6 bg-gray-50 dark:bg-gray-900">
      <div className="flex-1 h-full max-w-4xl mx-auto overflow-hidden bg-white rounded-lg shadow-xl dark:bg-gray-800">
        <div className="flex flex-col overflow-y-auto md:flex-row">
          <div className="h-32 md:h-auto md:w-1/2">
            <img
              aria-hidden="true"
              className="object-cover w-full h-full dark:hidden"
              src={ImageLight}
              alt="The Chess Centre"
            />
            <img
              aria-hidden="true"
              className="hidden object-cover w-full h-full dark:block"
              src={ImageDark}
              alt="The Chess Centre"
            />
          </div>
          <main className="flex items-center justify-center p-6 sm:p-12 md:w-1/2">
            <div className="w-full">
              {errorMessage && <p style={{color: "red"}}>{errorMessage}</p>}
              <img src={Logo} className="object-contain h-48 w-full" alt="The Chess Centre" />
              <h1 className="mb-4 text-xl font-semibold text-gray-700 dark:text-gray-200">Login</h1>
              <Label>
                <span>Email</span>
                <Input disabled={loading} className="mt-1" type="email" placeholder="john@doe.com" onChange={(e) => setEmail(e.target.value)} />
              </Label>

              <Label className="mt-4">
                <span>Password</span>
                <Input disabled={loading} className="mt-1" type="password" onChange={(e) => setPassword(e.target.value)} placeholder="***************" />
              </Label>

              <Button className="mt-4" onClick={signIn} disabled={loading}>
              {loading ? "loading...." :  'Log in'}
              </Button>

              <hr className="my-8" />

              <Button block layout="outline">
                <GithubIcon className="w-4 h-4 mr-2" aria-hidden="true" />
                Github
              </Button>

              <p className="mt-4">
                <Link
                  className="text-sm font-medium text-teal-600 dark:text-teal-400 hover:underline"
                  to="/forgot-password"
                >
                  Forgot your password?
                </Link>
              </p>
              <p className="mt-1">
                <Link
                  className="text-sm font-medium text-teal-600 dark:text-teal-400 hover:underline"
                  to="/register"
                >
                  Create account
                </Link>
              </p>
            </div>
          </main>
        </div>
      </div>
    </div>
  )
}

export default Login
