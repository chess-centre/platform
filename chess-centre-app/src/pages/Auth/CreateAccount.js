import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Logo from "../../assets/img/logo.svg";
import ImageLarge from "../../assets/img/create-account-desktop.png";
import ImageSmall from "../../assets/img/create-account-small.jpg";
import { Input, Label, Button } from "@windmill/react-ui";
import { useAuthDispatch, useAuthState, signUpUser } from "../../context/Auth";
import PrivacyPolicyModal from "../../components/Modal/PrivacyPolicyModal.js";
import ValidateEmail from "../../utils/ValidateEmail";
import Loading from "../../assets/img/loading.svg";
import SpecialLoading from "../../assets/img/special-loading.gif";

function Login(props) {
  const [isSpecialLoading, setIsSpecialLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [surname, setSurname] = useState("");
  const [password, setPassword] = useState("");
  const [rePassword, setRePassword] = useState("");
  const [isChecked, setIsChecked] = useState(false);
  const [isSubmitButtonActive, setSubmitButtonActive] = useState(true);
  const dispatch = useAuthDispatch();

  useEffect(() => {
    const isFormValid = () => {
      if (!email) return false;
      if (!firstName) return false;
      if (!surname) return false;
      if (!password) return false;
      if (!rePassword) return false;
      if (!isChecked) return false;
      if (password !== rePassword) return false;
      return true;
    };
    if (isFormValid()) {
      setSubmitButtonActive(true);
    } else {
      setSubmitButtonActive(false);
    }
  }, [email, firstName, isChecked, password, rePassword, surname]);

  const { loading, errorMessage } = useAuthState();

  const setPrivacyPolicyStatus = (checked) => {
    checked
      ? window.localStorage.setItem("privacyPolicy", "accepted")
      : window.localStorage.removeItem("privacyPolicy");
    setIsChecked(checked);
  };

  async function signUp() {
    const isValidEmail = ValidateEmail(email);
    let isFormValid = true;

    if (!firstName) {
      dispatch({
        type: "LOGIN_ERROR",
        error: "Your first name is a required field.",
      });
      isFormValid = false;
    }

    if (!surname) {
      dispatch({
        type: "LOGIN_ERROR",
        error: "Your surname is a required field.",
      });
      isFormValid = false;
    }

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
        let response = await signUpUser(
          dispatch,
          email,
          password,
          firstName,
          surname
        );
        if (response) {
          setIsSpecialLoading(true);
          setTimeout(() => {
            props.history.push(
              `/register/confirm/${email}${props.location.search}`
            );
            setIsSpecialLoading(false);
          }, 3000);
        } // if there's no response, the action dispatched a contextual error already
      } catch (error) {
        dispatch({ type: "LOGIN_ERROR", error });
        setIsSpecialLoading(false);
      }
    }
  }

  return (
    <div className="flex items-center min-h-screen p-6 bg-gray-50 dark:bg-gray-900">
      <div className="flex-1 h-full max-w-4xl mx-auto overflow-hidden bg-white rounded-lg shadow-xl dark:bg-gray-800">
        <div className="flex flex-col overflow-y-auto md:flex-row">
          <div className="h-22 md:h-auto md:w-1/2">
            <img
              aria-hidden="true"
              className="hidden object-cover w-full h-full sm:block"
              src={ImageLarge}
              alt="Office"
            />
            <img
              aria-hidden="true"
              className="sm:hidden object-cover object-bottom w-full h-32"
              src={ImageSmall}
              alt="Office"
            />{" "}
          </div>
          <main className="flex items-center justify-center p-6 sm:p-12 md:w-1/2">
            <div className="w-full">
              <Link to="/">
                {isSpecialLoading ? (
                  <img
                    src={SpecialLoading}
                    className="object-contain h-24 w-full md:h-44"
                    alt="Creating Account"
                  />
                ) : (
                  <img
                    src={Logo}
                    className="object-contain h-20 w-full md:h-36"
                    alt="The Chess Centre"
                  />
                )}
              </Link>
              <h1 className="mb-4 text-xl font-semibold text-gray-700 dark:text-gray-200">
                Create account
              </h1>
              <Label>
                <span>First Name</span>
                <Input
                  disabled={loading}
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  className="mt-1"
                  type="text"
                  placeholder="Garry"
                />
              </Label>
              <Label>
                <span onClick={() => setIsSpecialLoading(!isSpecialLoading)}>
                  Surname
                </span>
                <Input
                  disabled={loading}
                  value={surname}
                  onChange={(e) => setSurname(e.target.value)}
                  className="mt-1"
                  type="text"
                  placeholder="Kasparov"
                />
              </Label>
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
                  <img alt="Loading" className="h-5 w-5" src={Loading} />
                  <span className="mx-2">Creating account ...</span>
                </Button>
              ) : (
                <Button
                  onClick={signUp}
                  disabled={!isSubmitButtonActive && "disabled"}
                  block
                  className="mt-4"
                >
                  <span className="mx-2">Create account</span>
                </Button>
              )}

              <div className={errorMessage ? "my-2 text-centre" : "hidden"}>
                <p
                  className={
                    errorMessage
                      ? "text-sm text-red-700 dark:text-red-500"
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
                  to={`/login${props.location.search}`}
                >
                  Already have an account? Login
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
