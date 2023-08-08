import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import KingIcons from "../../assets/img/festival-register-small.jpg";
import Logo from "../../assets/img/logo.svg";
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
  const [confirmEmail, setConfirmEmail] = useState("");
  const [isChecked, setIsChecked] = useState(
    !!window.localStorage.getItem("email")
  );
  const stripe = useStripe();
  const dispatch = useAuthDispatch();
  const { loading, errorMessage } = useAuthState() as any;

  const signIn = async () => {
    setConfirmEmail(email);
    handleRememberMe(isChecked);
    let response = await loginUser(dispatch, email, password);
    if (response) {
      const { search } = props.location;
      const parsed = queryString.parse(search);
      if (parsed.plan) {
        await subscribe(dispatch, parsed.plan, stripe);
      } else if (parsed.eventId) {
        let section = "";
        let byes = "";
        if (parsed.section && parsed.section !== "undefined") {
          section = `&section=${parsed.section}`;
        }
        if(parsed.byes && parsed.byes !== "undefined") {
          byes = `&byes=${parsed.byes}`;
        }
        props.history.push(`/app/events?eventId=${parsed.eventId}${section}${byes}`);
      } else {
        if (props.history?.location?.state?.from) {
          const { pathname, search } = props.history.location.state.from;
          props.history.push(`${pathname}${search}`);
        } else {
          props.history.push("/app/dashboard");
        }
      }
    } else {
      return;
    }
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      signIn();
    }
  };

  const handleRememberMe = (isChecked) => {
    if (isChecked && email) {
      window.localStorage.setItem("email", email);
      setIsChecked(true);
    } else {
      window.localStorage.removeItem("email");
      setIsChecked(false);
    }
  };

  useEffect(() => {

    document.title = "The Chess Centre | Login";

    const userEmail = window.localStorage.getItem("email");
    if (userEmail) {
      setEmail(userEmail);
      setIsChecked(true);
    }
  }, []);

  return (
    <div className="flex items-center min-h-screen p-6 bg-gray-200 dark:bg-gray-900">
      <div className="flex-1 h-full max-w-4xl mx-auto overflow-hidden bg-white rounded-lg shadow-xl dark:bg-gray-800">
        <div className="flex flex-col overflow-y-auto md:flex-row">
          <div className="h-32 md:h-auto md:w-1/2 bg-blue-brand">
            <img
              aria-hidden="true"
              className="hidden sm:block object-scale-down object-center h-full py-6"
              src={KingIcons}
              alt="The Chess Centre"
            />
            <img
              aria-hidden="true"
              className="block sm:hidden object-scale-down object-center w-full h-full"
              src={KingIcons}
              alt="The Chess Centre"
            />
          </div>
          <main className="flex items-center justify-center p-6 sm:p-12 md:w-1/2">
            <div className="w-full">
              {loading ? (
                <img
                  src={SpecialLoading}
                  className="object-contain h-24 w-full md:h-40"
                  alt="Creating Account"
                />
              ) : (
                <Link to="/">
                  <img
                    src={Logo}
                    className="object-contain h-20 sm:h-28 w-full"
                    alt="The Chess Centre"
                  />
                </Link>
              )}
              <h1 className="mb-4 prose prose-sm text-xl font-semibold text-gray-700 dark:text-gray-200">
                Login
              </h1>

              <div className="mb-4 relative border border-gray-300 rounded-md px-3 py-2 shadow-sm focus-within:ring-1 focus-within:ring-teal-500 focus-within:border-teal-500">
                <label
                  htmlFor="name"
                  className="absolute -top-2 left-2 -mt-px inline-block px-1 bg-white text-xs text-gray-900"
                >
                  Email
                </label>
                <input
                  disabled={loading}
                  defaultValue={email}
                  onChange={(e) => setEmail(e.target.value)}
                  type="email"
                  required
                  className="block w-full border-0 p-0 text-teal-600 placeholder-gray-500 placeholder-opacity-50 focus:ring-0 text-sm"
                  placeholder="magnus@carlsen.com"
                />
              </div>

              <div className="relative border border-gray-300 rounded-md px-3 py-2 shadow-sm focus-within:ring-1 focus-within:ring-teal-500 focus-within:border-teal-500">
                <label
                  htmlFor="name"
                  className="absolute -top-2 left-2 -mt-px inline-block px-1 bg-white text-xs text-gray-900"
                >
                  Password
                </label>
                <input
                  disabled={loading}
                  onChange={(e) => setPassword(e.target.value)}
                  onKeyDown={handleKeyDown}
                  type="password"
                  required
                  className="block w-full border-0 p-0 text-teal-600 placeholder-gray-500 placeholder-opacity-50 focus:ring-0 text-sm"
                  placeholder="***************"
                />
              </div>

              <div className="relative inline-flex w-full">
                <div className="mt-6">
                  <input
                    type="checkbox"
                    disabled={loading}
                    className="focus:ring-teal-500 h-4 w-4 text-teal-600 border-gray-300 rounded"
                    defaultChecked={isChecked}
                    onChange={(e) => handleRememberMe(e.target.checked)}
                  />
                  <span className="ml-2 text-sm">Remember me</span>
                </div>

                <button
                  className="absolute mt-4 right-0 inline-flex items-center px-4 py-2 border border-transparent shadow text-sm leading-4 
                  font-medium rounded-md text-white bg-teal-600 hover:bg-teal-500 focus:outline-none focus:ring-2 
                  focus:ring-offset-2 focus:ring-teal-500"
                  onClick={signIn}
                  disabled={loading}
                >
                  {loading ? (
                    <div>
                      <div className="flex">
                        <img
                          alt="Loading"
                          className="h-4 w-4 mr-3"
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
                </button>
              </div>

              <div className={errorMessage ? "my-2 text-centre" : ""}>
                <p
                  className={
                    errorMessage
                      ? "text-sm font-semibold text-red-700"
                      : "hidden"
                  }
                >
                  {errorMessage}
                  {errorMessage === "User is not confirmed." && confirmEmail ? (
                    <Link
                      className="text-sm text-teal-600 font-medium hover:underline ml-1"
                      to={`/register/confirm/${confirmEmail}`}
                    >
                      Please click here to confirm.
                    </Link>
                  ) : (
                    ""
                  )}
                </p>
              </div>

              <hr className="my-8" />

              <p className="mt-4">
                <Link
                  className="text-sm font-medium text-teal-600 dark:text-teal-400 hover:underline"
                  to="/forgot-password"
                >
                  Forgot your password?
                </Link>
              </p>
              {/* <p className="mt-1">
                <Link
                  className="text-sm font-medium text-teal-600 dark:text-teal-400 hover:underline"
                  to="/register"
                >
                  Create account
                </Link>
              </p> */}
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
