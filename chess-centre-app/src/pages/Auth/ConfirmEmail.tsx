import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useToasts } from "react-toast-notifications";
import ImageLight from "../../assets/img/chess-players.jpg";
import ImageDark from "../../assets/img/chess-players.jpg";
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

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      submitActivationCode();
    }
  }

  async function resendCode() {
    try {
      await resendActivationCode(email);
      addToast(`Activation code resent to ${email}`, {
        appearance: "success",
        autoDismiss: true,
      });
    } catch (error) {
      dispatch({
        type: "ACTIVATION_CODE_ERROR",
        error: error.message,
      });
    }
  }

  useEffect(() => {
    document.title = "The Chess Centre | Confirm Email";
  }, []);

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

              <div className="relative border border-gray-300 rounded-md px-3 py-2 shadow-sm focus-within:ring-1 focus-within:ring-teal-500 focus-within:border-teal-500">
                <label
                  htmlFor="name"
                  className="absolute -top-2 left-2 -mt-px inline-block px-1 bg-white text-sm text-gray-900"
                >
                  enter activation code
                </label>
                <div className="flex space-x-3 mt-1">
                  <input
                    disabled={loading}
                    onChange={(e) => setCode(e.target.value)}
                    type="text"
                    placeholder="000000"
                    onKeyDown={handleKeyDown}
                    className="block w-full border-0 p-0 text-teal-600 placeholder-gray-500 placeholder-opacity-50 focus:ring-0 text-sm"
                  />
                </div>
                
              </div>


              <div className="relative w-full">
                <p className="text-xxs text-gray-500">This code has have been sent to your email address</p>
                <button
                  className="mt-4 w-full right-0 items-center px-4 py-2 border border-transparent shadow text-sm leading-4 
                font-medium rounded-md text-white bg-teal-600 hover:bg-teal-500 focus:outline-none focus:ring-2 
                focus:ring-offset-2 focus:ring-teal-500"
                  disabled={loading}
                  onClick={submitActivationCode}
                >
                  Confirm sign up
                </button>

              
              { errorMessage && <p className="mt-2 text-sm text-red-600 text-center">{errorMessage}</p>}

              </div>
              <hr className="my-8" />
              <div className="mt-4">
                <div
                  className="text-sm font-medium text-teal-600 hover:underline cursor-pointer"
                  onClick={resendCode}
                >
                  Resend
                </div>
              </div>
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
