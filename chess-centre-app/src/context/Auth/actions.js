import Amplify, { Auth, API, DataStore } from "aws-amplify";
import { Plan, Member } from "../../models";
import AWS_AUTH from "../../aws-exports";
Amplify.configure(AWS_AUTH);

export async function loginUser(dispatch, Email, Password) {
  dispatch({ type: "REQUEST_LOGIN" });
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

export async function isPaidMember(existing) {
  const getGroups = (user) => {
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

export async function isJuniorMember() {
  try {
    const user = await Auth.currentAuthenticatedUser();
    if (!user) return false;

    const member = await DataStore.query(Member, (m) =>
      m.id("eq", user.attributes.sub)
    );

    if (!member || member.length === 0) return false;

    const { stripeProductId } = member[0];
    if (!stripeProductId) return false;
    const plan = await DataStore.query(Plan, (p) =>
      p.stripeProductId("eq", stripeProductId)
    );
    if (!plan) return false;
    if (plan[0].key === "junior" || plan[0].key === "family") return true;

    return false;

  } catch (error) {
    console.log(error);
    return false;
  }
}
