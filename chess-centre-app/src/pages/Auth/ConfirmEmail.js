import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useToasts } from "react-toast-notifications";
import ImageLight from "../../assets/img/chess-players.jpg";
import ImageDark from "../../assets/img/chess-players.jpg";
import { Label, Input, Button } from "@windmill/react-ui";
import {
  useAuthDispatch,
  useAuthState,
  confirmEmail,
  resendActivationCode,
} from "../../context/Auth";

function ConfirmEmail(props) {
  const { addToast } = useToasts();
  const email = props?.match.params.email;
  const [code, setCode] = useState("");
  const dispatch = useAuthDispatch();
  const { errorMessage, loading } = useAuthState();

  async function submitActivationCode() {
    if (!code) {
      dispatch({
        type: "ACTIVATION_CODE_ERROR",
        error: "The code you entered is invalid",
      });
      return false;
    } else {
      const confirmed = await confirmEmail(dispatch, email, code);
      if (confirmed) {
        // after confirmation, the user needs to login
        props.history.push(`/login${props.location.search}`);
      }
      return;
    }
  }

  async function resendCode() {
    await resendActivationCode(email);
    addToast(`Activation code resent to ${email}`, {
      appearance: "success",
      autoDismiss: true,
    });
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
              <h1 className="mb-4 text-xl font-semibold text-gray-700 dark:text-gray-200">
                Account activation
              </h1>
              <Label>
                <span>
                  Enter your code{" "}
                  <span className="text-xs text-gray-600">
                    (sent to you via email)
                  </span>
                </span>

                <div className="flex space-x-3 mt-1">
                  <Input
                    disabled={loading}
                    onChange={(e) => setCode(e.target.value)}
                    type="text"
                    placeholder="000000"
                  />
                </div>
              </Label>
              <Button
                disabled={loading}
                onClick={submitActivationCode}
                block
                className="mt-4"
              >
                Confirm Sign Up
              </Button>
              <p
                className={
                  errorMessage ? "font-semibold text-red-500" : "hidden"
                }
              >
                {errorMessage}
              </p>
              <hr className="my-8 border-gray-200" />
              <p className="mt-4">
                <Link
                  className="text-sm font-medium text-teal-600 dark:text-teal-400 hover:underline"
                  onClick={resendCode}
                >
                  Resend
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

export default ConfirmEmail;
