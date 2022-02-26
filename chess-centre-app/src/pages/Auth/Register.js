import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Logo from "../../assets/img/logo.svg";
import ImageLarge from "../../assets/img/bar.jpg";
import ImageSmall from "../../assets/img/junior-rapidplay.jpg";
import { Input, Label, Button } from "@windmill/react-ui";
import { useAuthDispatch, useAuthState, signUpUser } from "../../context/Auth";
import PrivacyPolicyModal from "../../components/Modal/PrivacyPolicyModal.js";
import ValidateEmail from "../../utils/ValidateEmail";
import Loading from "../../assets/img/loading.svg";
import SpecialLoading from "../../assets/img/special-loading.gif";
import JuniorMemberSignUpModal from "../../components/Modal/JuniorMemberSignUpModal";

function Register(props) {
  const [isSpecialLoading, setIsSpecialLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [surname, setSurname] = useState("");
  const [password, setPassword] = useState("");
  const [rePassword, setRePassword] = useState("");
  const [isChecked, setIsChecked] = useState(false);
  const [isSubmitButtonActive, setSubmitButtonActive] = useState(true);
  const dispatch = useAuthDispatch();

  useEffect(() => {

    document.title = "The Chess Centre | Register";

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

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

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
          props.history.push(
            `/register/confirm/${email}${props.location.search}`
          );

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
              className="sm:hidden object-cover object-bottom w-full h-36"
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
              <h1 className="text-xl font-semibold text-gray-700 dark:text-gray-200">
                Register
              </h1>
              <div className="mb-4 text-right text-xs font-semibold text-gray-700 dark:text-gray-200">
                Creating a junior account?{" "}
                <span
                  className="text-teal-600 dark:text-teal-400 hover:underline cursor-pointer"
                  onClick={openModal}
                >
                  Help
                </span>
              </div>

              <div className="mb-4 relative border border-gray-300 rounded-md px-3 py-2 shadow-sm focus-within:ring-1 focus-within:ring-teal-500 focus-within:border-teal-500">
                <label
                  htmlFor="name"
                  className="absolute -top-2 left-2 -mt-px inline-block px-1 bg-white text-xs text-gray-900"
                >
                  First Name
                </label>
                <input
                  disabled={loading}
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  type="text"
                  className="block w-full border-0 p-0 text-gray-900 placeholder-gray-500 placeholder-opacity-50 focus:ring-0 text-sm"
                  placeholder="Garry"
                />
              </div>

              <div className="mb-4 relative border border-gray-300 rounded-md px-3 py-2 shadow-sm focus-within:ring-1 focus-within:ring-teal-500 focus-within:border-teal-500">
                <label
                  htmlFor="name"
                  className="absolute -top-2 left-2 -mt-px inline-block px-1 bg-white text-xs text-gray-900"
                >
                  Surname
                </label>
                <input
                  disabled={loading}
                  value={surname}
                  onChange={(e) => setSurname(e.target.value)}
                  type="text"
                  className="block w-full border-0 p-0 text-gray-900 placeholder-gray-500 placeholder-opacity-50 focus:ring-0 text-sm"
                  placeholder="Kasparov"
                />
              </div>

              <div className="mb-8 relative border border-gray-300 rounded-md px-3 py-2 shadow-sm focus-within:ring-1 focus-within:ring-teal-500 focus-within:border-teal-500">
                <label
                  htmlFor="name"
                  className="absolute -top-2 left-2 -mt-px inline-block px-1 bg-white text-xs text-gray-900"
                >
                  Email
                </label>
                <input
                  autoComplete="off"
                  disabled={loading}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  type="email"
                  className="block w-full border-0 p-0 text-gray-900 placeholder-gray-500 placeholder-opacity-50 focus:ring-0 text-sm"
                  placeholder="garry@kasparov.com"
                />
              </div>

              <div className="mb-4 relative border border-gray-300 rounded-md px-3 py-2 shadow-sm focus-within:ring-1 focus-within:ring-teal-500 focus-within:border-teal-500">
                <label
                  htmlFor="name"
                  className="absolute -top-2 left-2 -mt-px inline-block px-1 bg-white text-xs text-gray-900"
                >
                  Password
                </label>
                <input
                  autoComplete="off"
                  disabled={loading}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  type="password"
                  className="block w-full border-0 p-0 text-gray-900 placeholder-gray-500 placeholder-opacity-50 focus:ring-0 text-sm"
                  placeholder="***************"
                />
              </div>

              <div className="relative border border-gray-300 rounded-md px-3 py-2 shadow-sm focus-within:ring-1 focus-within:ring-teal-500 focus-within:border-teal-500">
                <label
                  htmlFor="name"
                  className="absolute -top-2 left-2 -mt-px inline-block px-1 bg-white text-xs text-gray-900"
                >
                  Confirm Password
                </label>
                <input
                  autoComplete="off"
                  disabled={loading}
                  value={rePassword}
                  onChange={(e) => setRePassword(e.target.value)}
                  type="password"
                  className="block w-full border-0 p-0 text-gray-900 placeholder-gray-500 placeholder-opacity-50 focus:ring-0 text-sm"
                  placeholder="***************"
                />
              </div>

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

              <p className="mt-2">
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
            <JuniorMemberSignUpModal
              open={isModalOpen}
              closeModal={closeModal}
            />
          </main>
        </div>
      </div>
    </div>
  );
}

export default Register;
