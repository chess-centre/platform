import React, { useState } from "react";
import { Link } from "react-router-dom";
import ImageDark from "../../assets/img/chess-players.jpg";
import Logo from "../../assets/img/logo.svg";
import { Label, Input, Button } from "@windmill/react-ui";
import {
  loginUser,
  subscribe,
  useAuthDispatch,
  useAuthState,
} from "../../context/Auth";
import Loading from "../../assets/img/loading.svg";
import SpecialLoading from "../../assets/img/special-loading.gif";
import queryString from "query-string";
import { useStripe } from "@stripe/react-stripe-js";

function Login(props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const stripe = useStripe();

  const dispatch = useAuthDispatch();
  const { loading, errorMessage } = useAuthState();

  async function signIn() {
    let response = await loginUser(dispatch, email, password);
    if (response) {
      const { search } = props.location;
      const parsed = queryString.parse(search);
      if (parsed.plan) {
        await subscribe(dispatch, parsed.plan, stripe);
      } else if (parsed.eventId) {
        props.history.push(`/app/events?eventId=${parsed.eventId}`);
      } else {
        props.history.push("/app");
      }
    } else {
      return;
    }
  }

  return (
    <div className="flex items-center min-h-screen p-6 bg-gray-200 dark:bg-gray-900">
      <div className="flex-1 h-full max-w-4xl mx-auto overflow-hidden bg-white rounded-lg shadow-xl dark:bg-gray-800">
        <div className="flex flex-col overflow-y-auto md:flex-row">
          <div className="h-32 md:h-auto md:w-1/2">
            <img
              aria-hidden="true"
              className="object-cover object-center w-full h-full block"
              src={ImageDark}
              alt="The Chess Centre"
            />
          </div>
          <main className="flex items-center justify-center p-6 sm:p-12 md:w-1/2">
            <div className="w-full">
              <Link to="/">
                {loading ? (
                  <img
                    src={SpecialLoading}
                    className="object-contain h-24 w-full md:h-40"
                    alt="Creating Account"
                  />
                ) : (
                  <img
                    src={Logo}
                    className="object-contain h-20 sm:h-28 w-full"
                    alt="The Chess Centre"
                  />
                )}
              </Link>
              <h1 className="mb-4 text-xl font-semibold text-gray-700 dark:text-gray-200">
                Login
              </h1>
              <Label>
                <span>Email</span>
                <Input
                  disabled={loading}
                  className="mt-1"
                  type="email"
                  placeholder="magnus@carlsen.com"
                  onChange={(e) => setEmail(e.target.value)}
                />
              </Label>

              <Label className="mt-4">
                <span>Password</span>
                <Input
                  disabled={loading}
                  className="mt-1"
                  type="password"
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="***************"
                />
              </Label>

              <Button className="mt-4" onClick={signIn} disabled={loading}>
                {loading ? (
                  <div>
                    <div className="flex">
                      <img
                        alt="Loading"
                        className="h-5 w-5 mr-3"
                        src={Loading}
                      />{" "}
                      <span className="inline-block align-middle text-sm font-thin">
                        Preparing ...
                      </span>
                    </div>
                  </div>
                ) : (
                  "Login"
                )}
              </Button>

              <div className={errorMessage ? "my-2 text-centre" : ""}>
                <p
                  className={
                    errorMessage
                      ? "text-sm font-semibold text-red-700"
                      : "hidden"
                  }
                >
                  {errorMessage}
                </p>
              </div>

              <hr className="my-8 border-gray-200" />

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
              <p className="mt-1">
                <Link
                  className="text-sm font-medium text-gray-400 dark:text-gray-400 hover:underline"
                  to="/"
                >
                  Home
                </Link>
              </p>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}

export default Login;
