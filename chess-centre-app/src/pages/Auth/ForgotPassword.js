import React, { useState } from "react";
import { Link } from "react-router-dom";
import Image from "../../assets/img/chess-players.jpg";
import { Label, Input, Button } from "@windmill/react-ui";
import {
  useAuthDispatch,
  userPasswordForgotSubmit,
  userPasswordForgot,
  useAuthState,
} from "../../context/Auth";

function ForgotPassword(props) {
  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");
  const [password, setPassword] = useState("");
  const [forget, setForget] = useState(false);

  const dispatch = useAuthDispatch();
  const { loading, errorMessage } = useAuthState();

  async function passwordForgot() {
    const mailFormat = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/;
    if (!email && !email.match(mailFormat)) {
      dispatch({
        type: "LOGIN_ERROR",
        error: "You have entered an invalid email address!",
      });
      return false;
    } else {
      await userPasswordForgot(dispatch, email);
      setForget(true);
    }
  }
  async function passwordForgotSubmit() {
    if (!code && !password) {
      dispatch({
        type: "LOGIN_ERROR",
        error: "Please enter code and password",
      });
      return false;
    } else {
      const changed = await userPasswordForgotSubmit(
        dispatch,
        email,
        code,
        password
      );
      if (changed) {
        props.history.push("/login");
      }
    }
  }

  async function resendCode() {
    // visual indicator that this succeeded?
    await userPasswordForgot(dispatch, email);
  }

  return (
    <div className="flex items-center min-h-screen p-6 bg-gray-50 dark:bg-gray-900">
      <div className="flex-1 h-full max-w-4xl mx-auto overflow-hidden bg-white rounded-lg shadow-xl dark:bg-gray-800">
        <div className="flex flex-col overflow-y-auto md:flex-row">
          <div className="h-32 md:h-auto md:w-1/2">
            <img
              aria-hidden="true"
              className="object-cover w-full h-full"
              src={Image}
              alt="Chess Players"
            />
          </div>
          <main className="flex items-center justify-center p-6 sm:p-12 md:w-1/2">
            <div className="w-full">
              <h1 className="mb-4 text-xl font-semibold text-gray-700 dark:text-gray-200">
                Forgot password
              </h1>
              {!forget ? (
                <Label>
                  <span>Email</span>
                  <Input
                    disabled={loading}
                    className="mt-1"
                    onChange={(e) => setEmail(e.target.value)}
                    type="email"
                    placeholder="garry@kasparov.com"
                  />
                </Label>
              ) : (
                <>
                  <Label>
                    <span>Code</span>
                    <div className="flex space-x-3 mt-1">
                      <Input
                        disabled={loading}
                        onChange={(e) => setCode(e.target.value)}
                        type="text"
                        placeholder="000000"
                      />
                      <Button disabled={loading} onClick={resendCode}>
                        Resend
                      </Button>
                    </div>
                  </Label>
                  <Label>
                    <span>New Password</span>
                    <Input
                      disabled={loading}
                      className="mt-1"
                      onChange={(e) => setPassword(e.target.value)}
                      type="password"
                      placeholder="Password"
                    />
                  </Label>
                </>
              )}
              <Button
                onClick={forget ? passwordForgotSubmit : passwordForgot}
                block
                className="mt-4"
              >
                {forget ? "Submit Password" : "Recover password"}
              </Button>

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

              <hr className="my-4" />
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

export default ForgotPassword;
