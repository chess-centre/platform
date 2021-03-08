import Amplify, { Auth } from "aws-amplify";
import AWS_AUTH from "../../aws-exports";
Amplify.configure(AWS_AUTH);



export async function loginUser(dispatch, Email, Password) {
	try {
		dispatch({ type: "REQUEST_LOGIN" });
		let data = await Auth.signIn(Email, Password);
		if (data.attributes) {
			dispatch({ type: "LOGIN_SUCCESS", payload: data });
			localStorage.setItem("currentUser", JSON.stringify(data.attributes));
			return data.attributes;
		}
		dispatch({ type: "LOGIN_ERROR", error: data.message });
		return;
	} catch (error) {
		dispatch({ type: "LOGIN_ERROR", error: error.message });
		console.log(error);
	}
}

export async function UserPasswordForgot(dispatch, email) {
	try {
		dispatch({ type: "REQUEST_LOGIN" });
		let data = await Auth.forgotPassword(email);
		dispatch({ type: "STOP_LOADING" });
		return data;
	} catch (error) {
		dispatch({ type: "LOGIN_ERROR", error: error.message });
		console.log(error);
	}
}

export async function UserPasswordForgotSubmit(dispatch, email, code, newPassword) {
	try {
		dispatch({ type: "REQUEST_LOGIN" });
		let data = await Auth.forgotPasswordSubmit(email, code, newPassword);
		dispatch({ type: "STOP_LOADING" });
		return data;
	} catch (error) {
		dispatch({ type: "LOGIN_ERROR", error: error.message });
	}
}

export async function signUpUser(dispatch, Email, Password) {
	try {
		dispatch({ type: "REQUEST_LOGIN" });
		let data = await Auth.signUp({
			username: Email,
			password: Password,
			attributes: { email: Email, }
		});
		if (data.attributes) {
			dispatch({ type: "LOGIN_SUCCESS", payload: data });
			localStorage.setItem("currentUser", JSON.stringify(data.attributes));
			return data.attributes;
		}
		dispatch({ type: "LOGIN_ERROR", error: data.message });
		return;
	} catch (error) {
		dispatch({ type: "LOGIN_ERROR", error: error.message });
		console.log(error);
	}
}

export async function logout(dispatch) {
	await Auth.signOut();
	dispatch({ type: "LOGOUT" });
	localStorage.removeItem("currentUser");
	localStorage.removeItem("token");
}
