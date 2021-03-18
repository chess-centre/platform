let user = (() => {
  try {
    return JSON.parse(localStorage.getItem("currentUser"));
  } catch {
    return;
  }
})();
let token = (() => {
  try {
    return JSON.parse(localStorage.getItem("currentUser"));
  } catch {
    return;
  }
})();

export const initialState = {
  user: "" || user,
  token: "" || token,
  loading: false,
  errorMessage: null,
};

export const AuthReducer = (initialState, action) => {
  switch (action.type) {
    case "REQUEST_LOGIN":
      return {
        ...initialState,
        loading: true,
      };
    case "STOP_LOADING":
      return {
        ...initialState,
        loading: false,
        errorMessage: null,
      };
    case "LOGIN_SUCCESS":
      return {
        ...initialState,
        user: action.payload,
        token: action.payload,
        loading: false,
        errorMessage: null,
      };
    case "LOGIN_ERROR":
      return {
        ...initialState,
        loading: false,
        errorMessage: action.error,
      };
    case "SIGNUP_SUCCESS":
      return {
        ...initialState,
        user: action.payload,
        token: action.payload,
        loading: false,
        errorMessage: null,
      };
    case "SIGNUP_ERROR":
      return {
        ...initialState,
        loading: false,
        errorMessage: action.error,
      };
    case "LOGOUT":
      return {
        ...initialState,
        user: "",
        token: "",
        errorMessage: null,
      };
    case "CONFIRM_EMAIL_PENDING":
      return {
        ...initialState,
        loading: true,
        user: {
          userConfirmed: false,
        },
        errorMessage: null,
      };
    case "CONFIRM_EMAIL_SUCCESS":
      return {
        ...initialState,
        loading: false,
        errorMessage: null,
      };
    case "CONFIRM_EMAIL_ERROR":
    case "ACTIVATION_CODE_ERROR":
      return {
        ...initialState,
        loading: false,
        errorMessage: action.error,
      };
    default:
      throw new Error(`Unhandled action type: ${action.type}`);
  }
};
