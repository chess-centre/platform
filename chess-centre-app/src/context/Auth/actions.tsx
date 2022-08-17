import Amplify, { Auth, API, DataStore } from "aws-amplify";
import AWS_AUTH from "../../aws-exports";
Amplify.configure({
  ...AWS_AUTH,
  aws_appsync_authenticationType: 'AMAZON_COGNITO_USER_POOLS',
});

export async function loginUser(dispatch, Email, Password) {
  dispatch({ type: "REQUEST_LOGIN" });

  if (!Email || !Password) {
    dispatch({
      type: "LOGIN_MISSING_FIELDS",
      error: "Please enter both email and password."
    });
    return;
  }

  const user = await Auth.signIn(Email, Password).catch((error) => {
    dispatch({ type: "LOGIN_ERROR", error: error.message });
  });

  if (user) {
    dispatch({ type: "LOGIN_SUCCESS", payload: user });
    localStorage.setItem("currentUser", JSON.stringify(user));
    return user;
  }
  return;
}

export async function userPasswordForgot(dispatch, email) {
  try {
    dispatch({ type: "REQUEST_LOGIN" });
    let data = await Auth.forgotPassword(email);
    dispatch({ type: "STOP_LOADING" });
    return data;
  } catch (error) {
    dispatch({ type: "LOGIN_ERROR", error: error.message });
  }
}

export async function userPasswordForgotSubmit(
  dispatch,
  email,
  code,
  newPassword
) {
  try {
    dispatch({ type: "REQUEST_LOGIN" });
    await Auth.forgotPasswordSubmit(email, code, newPassword);
    dispatch({ type: "STOP_LOADING" });
    return "SUCCESS";
  } catch (error) {
    dispatch({ type: "LOGIN_ERROR", error: error.message });
  }
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
        given_name: firstName.trim(),
        family_name: surname.trim(),
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
  }
}

export async function confirmEmail(dispatch, email, code) {
  dispatch({ type: "CONFIRM_EMAIL_PENDING" });
  const success = await Auth.confirmSignUp(email, code, {}).catch((error) => {
    dispatch({ type: "CONFIRM_EMAIL_ERROR", error: error.message });
    return;
  });

  if (success) dispatch({ type: "CONFIRM_EMAIL_SUCCESS" });
  return success;
}

export async function resendActivationCode(email) {
  const sent = await Auth.resendSignUp(email);
  return sent;
}

export async function logout(dispatch) {
  await Auth.signOut();
  await DataStore.clear();
  dispatch({ type: "LOGOUT" });
  localStorage.removeItem("currentUser");
  localStorage.removeItem("token");
}

export async function subscribe(dispatch, plan, stripe) {
  dispatch({ type: "LOADING" });
  const {
    attributes: { email },
  } = await Auth.currentAuthenticatedUser();
  const redirectTo = `${window.location.origin}/app/dashboard`;

  try {
    const { sessionId } = await API.post("public", "/checkout", {
      body: {
        plan,
        successUrl: redirectTo,
        cancelUrl: redirectTo,
        email,
      },
    });
    await stripe.redirectToCheckout({ sessionId });
  } catch (error) {
    dispatch({ type: "STOP_LOADING" });
    throw new Error("Unable to subscribe.");
  }
  dispatch({ type: "STOP_LOADING" });
}

export async function isAdmin() {
  const user = await Auth.currentAuthenticatedUser();
  if (user) {
    const groups = user?.signInUserSession?.accessToken?.payload['cognito:groups'];
    if (groups && Array.isArray(groups) && groups[0] === "admin") {
      return true;
    }
  }
  return false;
}

export async function isPaidMember(existing: any) {
  const getGroups = (user: any) => {
    return user.signInUserSession.idToken.payload["cognito:groups"];
  };

  if (existing) {
    let groups = getGroups(existing);
    if (groups && groups.includes("Member")) return true;
  }

  // First, try to get the user from cache; if it already
  // has the group, return true. Else, do a fetch to make sure
  // we have the latest claims from Cognito.
  let user = await Auth.currentAuthenticatedUser();
  let groups = getGroups(user);
  if (groups && groups.includes("Member")) return true;

  user = await Auth.currentAuthenticatedUser({ bypassCache: true });
  groups = getGroups(user);
  return (groups && groups.includes("Member")) || false;
}


