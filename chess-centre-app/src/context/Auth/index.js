import {
  loginUser,
  logout,
  signUpUser,
  confirmEmail,
  userPasswordForgot,
  userPasswordForgotSubmit,
  getCurrentAuthenticatedUser,
  updateUserAttributes,
  resendActivationCode,
} from "./actions";
import { AuthProvider, useAuthDispatch, useAuthState } from "./context";

export {
  AuthProvider,
  useAuthState,
  useAuthDispatch,
  loginUser,
  signUpUser,
  confirmEmail,
  getCurrentAuthenticatedUser,
  updateUserAttributes,
  resendActivationCode,
  userPasswordForgot,
  userPasswordForgotSubmit,
  logout,
};
