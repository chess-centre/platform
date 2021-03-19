import {
  loginUser,
  logout,
  signUpUser,
  confirmEmail,
  userPasswordForgot,
  userPasswordForgotSubmit,
  getCurrentAuthenticatedUser,
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
  resendActivationCode,
  userPasswordForgot,
  userPasswordForgotSubmit,
  logout,
};
