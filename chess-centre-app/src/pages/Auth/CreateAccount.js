import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Logo from "../../assets/img/logo.svg";
import ImageLarge from "../../assets/img/create-account-large.jpg";
import ImageSmall from "../../assets/img/create-account-small.jpg";
import { Input, Label, Button } from "@windmill/react-ui";
import { useAuthDispatch, useAuthState, signUpUser } from "../../context/Auth";
import PrivacyPolicyModal from "../../components/PrivacyPolicyModal.js";
import validateEmail from "../../utils/validateEmail";

function Login(props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rePassword, setRePassword] = useState("");
  const [isChecked, setIsChecked] = useState(false);
  const [isSubmitButtonActive, setSubmitButtonActive] = useState(true);
  const dispatch = useAuthDispatch();

  useEffect(() => {
    if (!email && !password && password !== rePassword && !isChecked) {
      setSubmitButtonActive(true);
    } else {
      setSubmitButtonActive(false);
    }
  }, [email, password, rePassword, isChecked]);

  const { loading, errorMessage } = useAuthState();

  const setPrivacyPolicyStatus = (checked) => {
    checked
      ? window.localStorage.setItem("privacyPolicy", "accepted")
      : window.localStorage.removeItem("privacyPolicy");
    setIsChecked(checked);
  };

  async function signUp() {
    const isValidEmail = validateEmail(email);
    let isFormValid = true;

    if (!email) {
      dispatch({
        type: "LOGIN_ERROR",
        error: "Your Email address is a required field.",
      });
      isFormValid = false;
    }

    if (!isValidEmail) {
      dispatch({
        type: "LOGIN_ERROR",
        error: "Oops! You have entered an invalid email address!",
      });
      isFormValid = false;
    }

    if (!password || !(password === rePassword)) {
      dispatch({
        type: "LOGIN_ERROR",
        error: "Please check and retype your password.",
      });
      isFormValid = false;
    }

    if (!isChecked) {
      dispatch({
        type: "LOGIN_ERROR",
        error:
          "Please read & accept our privacy policy before creating your account.",
      });
      isFormValid = false;
    }

    if (isFormValid) {
      try {
        let response = await signUpUser(dispatch, email, password);
        if (response) {
          props.history.push(`/register/confirm/${email}`);
        } // if there's no response, the action dispatched a contextual error already
      } catch (error) {
        dispatch({ type: "LOGIN_ERROR", error });
      }
    }
  }

  return (
    <div className="flex items-center min-h-screen p-6 bg-gray-50 dark:bg-gray-900">
      <div className="flex-1 h-full max-w-4xl mx-auto overflow-hidden bg-white rounded-lg shadow-xl dark:bg-gray-800">
        <div className="flex flex-col overflow-y-auto md:flex-row">
          <div className="h-32 md:h-auto md:w-1/2">
            <img
              aria-hidden="true"
              className="hidden object-cover w-full h-full sm:block"
              src={ImageLarge}
              alt="Office"
            />
            <img
              aria-hidden="true"
              className="sm:hidden object-cover object-bottom w-full h-full"
              src={ImageSmall}
              alt="Office"
            />
          </div>
          <main className="flex items-center justify-center p-6 sm:p-12 md:w-1/2">
            <div className="w-full">
              <Link to="/">
                <img
                  src={Logo}
                  className="object-contain h-20 w-full md:h-36 "
                  alt="The Chess Centre"
                />
              </Link>
              <h1 className="mb-4 text-xl font-semibold text-gray-700 dark:text-gray-200">
                Create account
              </h1>
              <Label>
                <span>Email</span>
                <Input
                  disabled={loading}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="mt-1"
                  type="email"
                  placeholder="garry@kasparov.com"
                />
              </Label>
              <Label className="mt-4">
                <span>Password</span>
                <Input
                  disabled={loading}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="mt-1"
                  placeholder="***************"
                  type="password"
                />
              </Label>
              <Label className="mt-4">
                <span>Confirm password</span>
                <Input
                  disabled={loading}
                  value={rePassword}
                  className="mt-1"
                  onChange={(e) => setRePassword(e.target.value)}
                  placeholder="***************"
                  type="password"
                />
              </Label>

              <Label className="mt-6" check>
                <Input
                  type="checkbox"
                  checked={isChecked}
                  disabled={loading}
                  onChange={(e) => setPrivacyPolicyStatus(e.target.checked)}
                />
                <span className="ml-2">
                  I agree to the <PrivacyPolicyModal />
                </span>
              </Label>

              {loading ? (
                <Button disabled={"disabled"} block className="mt-4">
                  <div className="rounded animate-spin ease duration-300 w-4 h-4 border-2 border-orange"></div>
                  <span className="mx-2">Please wait ...</span>
                </Button>
              ) : (
                <Button
                  onClick={signUp}
                  disabled={isSubmitButtonActive && "disabled"}
                  block
                  className="mt-4"
                >
                  <span className="mx-2">Create account</span>
                </Button>
              )}

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

              <hr className="my-8" />

              <p className="mt-4">
                <Link
                  className="text-sm font-medium text-teal-600 dark:text-teal-400 hover:underline"
                  to="/login"
                >
                  Already have an account? Login
                </Link>
              </p>
              <p className="mt-1">
                <Link
                  className="text-sm font-medium text-gray-400 dark:text-gray-900 hover:underline"
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
