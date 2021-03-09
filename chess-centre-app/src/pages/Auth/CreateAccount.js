import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Logo from "../../assets/img/logo.png";
import ImageLight from "../../assets/img/create-account-light.jpg";
import ImageDark from "../../assets/img/create-account-light.jpg";
// import { GithubIcon } from "../../icons";
import { Input, Label, Button } from "@windmill/react-ui";
import { useAuthDispatch, useAuthState, signUpUser } from "../../context/Auth";
import PrivacyPolicyModal from "../../components/PrivacyPolicyModal";

function Login() {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rePassword, setRePassword] = useState("");
  const [ischecked, setischecked] = useState(false);
  const [isButton, setisButton] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);

  function openModal() {
    setIsModalOpen(true)
  }
  function closeModal() {
    setIsModalOpen(false)
  }


  const dispatch = useAuthDispatch();

  useEffect(() => {
    if (!email && !password && password !== rePassword && !ischecked) {
      setisButton(true);
    }
    else {
      setisButton(false);
    }
  }, [email, password, rePassword, ischecked]);

  const { loading, errorMessage } = useAuthState();

  async function signUp(props) {
    const mailFormat = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/; 
    if (!email) {
      dispatch({ type: "LOGIN_ERROR", error: "Email cannot be empty" });
    }
    else if (!email.match(mailFormat)) { 
      dispatch({ type: "LOGIN_ERROR", error: "You have entered an invalid email address!" });
    }
    else if (password !== rePassword) {
      dispatch({ type: "LOGIN_ERROR", error: "Password is not match" });
    }
    else {
      try {
        let response = await signUpUser(dispatch, email, password);
        if (response) {
          props.history.push("/app");
        }
        else {
          return;
        }
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
              className="object-cover w-full h-full dark:hidden"
              src={ImageLight}
              alt="Office"
            />
            <img
              aria-hidden="true"
              className="hidden object-cover w-full h-full dark:block"
              src={ImageDark}
              alt="Office"
            />
          </div>
          <main className="flex items-center justify-center p-6 sm:p-12 md:w-1/2">
            <div className="w-full">
              {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
              <img src={Logo} className="object-contain h-48 w-full" alt="The Chess Centre" />
              <h1 className="mb-4 text-xl font-semibold text-gray-700 dark:text-gray-200">
                Create account
              </h1>
              <Label>
                <span>Email</span>
                <Input disabled={loading}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="mt-1" type="email" placeholder="john@doe.com" />
              </Label>
              <Label className="mt-4">
                <span>Password</span>
                <Input disabled={loading}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)} className="mt-1"
                  placeholder="***************" type="password" />
              </Label>
              <Label className="mt-4">
                <span>Confirm password</span>
                <Input disabled={loading}
                  value={rePassword}
                  className="mt-1"
                  onChange={(e) => setRePassword(e.target.value)}
                  placeholder="***************"
                  type="password" />
              </Label>

              <Label className="mt-6" check>
                <Input type="checkbox" checked={ischecked} disabled={loading}
                  onChange={(e) => setischecked(e.target.checked)} />
                <span className="ml-2">
                  I agree to the <span className="underline">privacy policy</span>
                </span>
              </Label>

              <Button onClick={signUp} disabled={isButton && "disabled"} block className="mt-4">
                Create account
              </Button>

              <hr className="my-8" />

              {/* <Button block layout="outline">
                <GithubIcon className="w-4 h-4 mr-2" aria-hidden="true" />
                Github
              </Button> */}

              <p className="mt-4">
                <Link
                  className="text-sm font-medium text-teal-600 dark:text-teal-400 hover:underline"
                  to="/login"
                >
                  Already have an account? Login
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
