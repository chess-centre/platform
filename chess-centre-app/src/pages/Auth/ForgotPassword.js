import React, { useState } from "react";
import ImageLight from "../../assets/img/chess-players.jpg";
import ImageDark from "../../assets/img/chess-players.jpg";
import { Label, Input, Button } from "@windmill/react-ui";
import { useAuthDispatch, UserPasswordForgotSubmit, UserPasswordForgot, useAuthState } from "../../context/Auth";

function ForgotPassword(props) {
  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");
  const [password, setPassword] = useState("");
  const [forget, setForget] = useState(false);

  const dispatch = useAuthDispatch();
  const { loading, errorMessage } = useAuthState();

  async function PasswordForgot() {
    const mailFormat = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/; 
    if (!email && !email.match(mailFormat)) {
      dispatch({ type: "LOGIN_ERROR", error: "You have entered an invalid email address!" });
      return false;
    }
    else {
      await UserPasswordForgot(dispatch, Email);
      setForget(true);
    }

  }
  async function PasswordForgotSubmit() {
    if (!code && !password) {
      dispatch({ type: "LOGIN_ERROR", error: "Please enter code and password" });
      return false
    }
    else {
     const changed =  await UserPasswordForgotSubmit(dispatch, email, code, password)
     if(changed){
       props.history.push("/login");
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
              alt="Chess Players"
            />
            <img
              aria-hidden="true"
              className="hidden object-cover w-full h-full dark:block"
              src={ImageDark}
              alt="Chess Players"
            />
          </div>
          <main className="flex items-center justify-center p-6 sm:p-12 md:w-1/2">
            <div className="w-full">
              {errorMessage && <p>{errorMessage}</p>}
              <h1 className="mb-4 text-xl font-semibold text-gray-700 dark:text-gray-200">
                Forgot password
              </h1>

              {!forget ?
                <Label>
                  <span>Email</span>
                  <Input disabled={loading} className="mt-1" onChange={(e) => setEmail(e.target.value)} type="email" placeholder="email@example.com" />
                </Label>
                :
                <>
                  <Label>
                    <span>Code</span>
                    <Input disabled={loading} className="mt-1" onChange={(e) => setCode(e.target.value)} type="text" placeholder="Code" />
                  </Label>
                  <Label>
                    <span>New Password</span>
                    <Input disabled={loading} className="mt-1" onChange={(e) => setPassword(e.target.value)} type="password" placeholder="Password" />
                  </Label>
                </>
              }
              <Button onClick={forget ? PasswordForgotSubmit : PasswordForgot} block className="mt-4">
                {forget ? "Submit Password" : "Recover password"}
              </Button>
            </div>
          </main>
        </div>
      </div>
    </div>
  )
}

export default ForgotPassword
