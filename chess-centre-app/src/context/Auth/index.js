import {
  loginUser,
  logout,
  signUpUser,
  confirmEmail,
  userPasswordForgot,
  userPasswordForgotSubmit,
  updateUserAttributes,
  resendActivationCode,
  isPaidMember,
  subscribe,
} from "./actions";
import { AuthProvider, useAuthDispatch, useAuthState } from "./context";

export {
  AuthProvider,
  useAuthState,
  useAuthDispatch,
  loginUser,
  signUpUser,
  confirmEmail,
  updateUserAttributes,
  resendActivationCode,
  userPasswordForgot,
  userPasswordForgotSubmit,
  logout,
  isPaidMember,
  subscribe,
};
