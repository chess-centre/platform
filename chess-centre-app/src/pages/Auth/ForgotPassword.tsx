import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useToasts } from "react-toast-notifications";
import Image from "../../assets/img/chess-players.jpg";
import {
  useAuthDispatch,
  userPasswordForgotSubmit,
  userPasswordForgot,
  useAuthState,
} from "../../context/Auth";

function ForgotPassword(props) {
  const { addToast } = useToasts();
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
    if (!email) {
      addToast(`Email not present, please ensure you have provided it.`, {
        appearance: "error",
        autoDismiss: true,
      });
      return;
    } else {
      await userPasswordForgot(dispatch, email);
      addToast(`Activation code resent to ${email}`, {
        appearance: "success",
        autoDismiss: true,
      });
    }
  }

  useEffect(() => {
    document.title = "Sheffield Chess Centre | Forgot Password";
  }, []);

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
                <div className="mb-4 relative border border-gray-300 rounded-md px-3 py-2 shadow-sm focus-within:ring-1 focus-within:ring-teal-500 focus-within:border-teal-500">
                  <label
                    htmlFor="name"
                    className="absolute -top-2 left-2 -mt-px inline-block px-1 bg-white text-xs text-gray-900"
                  >
                    Email
                  </label>
                  <input
                    disabled={loading}
                    onChange={(e) => setEmail(e.target.value)}
                    type="email"
                    required
                    className="block w-full border-0 p-0 text-teal-600 placeholder-gray-500 placeholder-opacity-50 focus:ring-0 sm:text-sm"
                    placeholder="garry@kasparov.com"
                  />
                </div>
              ) : (
                <>
                  <div className="mb-4 relative border border-gray-300 rounded-md px-3 py-2 shadow-sm focus-within:ring-1 focus-within:ring-teal-500 focus-within:border-teal-500">
                    <label
                      htmlFor="name"
                      className="absolute -top-2 left-2 -mt-px inline-block px-1 bg-white text-xs text-gray-900"
                    >
                      Code <span className="text-xs">(sent to your email)</span>
                    </label>
                    <input
                      disabled={loading}
                      autoCorrect="on"
                      onChange={(e) => setCode(e.target.value)}
                      type="number"
                      required

                      className="block w-full border-0 p-0 text-teal-600 placeholder-gray-500 placeholder-opacity-50 focus:ring-0 sm:text-sm"
                      placeholder="000000"
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
                      type="password"
                      required
                      className="block w-full border-0 p-0 text-teal-600 placeholder-gray-500 placeholder-opacity-50 focus:ring-0 sm:text-sm"
                      placeholder="***************"
                    />
                  </div>
                </>
              )}
              <button
                onClick={forget ? passwordForgotSubmit : passwordForgot}
                block
                className="mt-4 inline-flex items-center px-3 py-2 border border-transparent shadow text-sm leading-4 
                font-medium rounded-md text-white bg-teal-600 hover:bg-teal-500 focus:outline-none focus:ring-2 
                focus:ring-offset-2 focus:ring-teal-500"
              >
                {forget ? "Submit Password" : "Recover password"}
              </button>

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
              {forget && (
                <p className="mt-1">
                  <Link
                    className="text-sm font-medium text-teal-600 dark:text-gray-400 hover:underline"
                    disabled={loading}
                    onClick={resendCode}
                  >
                    Resend
                  </Link>
                </p>
              )}
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
