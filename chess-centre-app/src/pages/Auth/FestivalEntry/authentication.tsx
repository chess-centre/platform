import { Auth } from "aws-amplify";

export async function loginUser(dispatch, email, password) {
  dispatch({ type: "REQUEST_LOGIN" });

  if (!email || !password) {
    dispatch({
      type: "LOGIN_MISSING_FIELDS",
      error: "Please enter both email and password."
    });
    return;
  }

  const user = await Auth.signIn(email, password).catch((error) => {
    dispatch({ type: "LOGIN_ERROR", error: error.message });
    throw new Error(error.message);
  });

  if (user) {
    dispatch({ type: "LOGIN_SUCCESS", payload: user });
    localStorage.removeItem("currentUser");
    localStorage.setItem("currentUser", JSON.stringify(user?.attributes));
    return user;
  }
  return;
}

export async function signUpUser(
  dispatch,
  email,
  password,
  firstName,
  surname
) {
  try {
    dispatch({ type: "REQUEST_LOGIN" });

    let user = await Auth.signUp({
      username: email,
      password,
      attributes: {
        email,
        given_name: firstName,
        family_name: surname,
      },
    });

    if (user) {
      dispatch({ type: "LOGIN_SUCCESS", payload: user });
      localStorage.setItem("currentUser", JSON.stringify(user));
      return user;
    }
    return;
  } catch (error) {
    dispatch({ type: "LOGIN_ERROR", error: error.message });
    throw new Error(error.message);
  }
}

export async function confirmEmail(dispatch, email, code) {
  dispatch({ type: "CONFIRM_EMAIL_PENDING" });


  const success = await Auth.confirmSignUp(email, code, {}).catch((error) => {
    dispatch({ type: "CONFIRM_EMAIL_ERROR", error: error.message });
    throw new Error(error.message);
  });

  if (success) {
    dispatch({ type: "CONFIRM_EMAIL_SUCCESS" })
    return success;
  }


}

export async function resendActivationCode(email) {
  const sent = await Auth.resendSignUp(email);
  return sent;
}








