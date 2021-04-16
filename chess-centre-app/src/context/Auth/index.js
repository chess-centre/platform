import {
  loginUser,
  logout,
  signUpUser,
  confirmEmail,
  userPasswordForgot,
  userPasswordForgotSubmit,
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
  updateUserAttributes,
  resendActivationCode,
  userPasswordForgot,
  userPasswordForgotSubmit,
  logout,
};
