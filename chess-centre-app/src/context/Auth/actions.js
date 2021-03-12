import Amplify, { Auth } from "aws-amplify";
import AWS_AUTH from "../../aws-exports";
Amplify.configure(AWS_AUTH);

export async function loginUser(dispatch, Email, Password) {
	dispatch({ type: "REQUEST_LOGIN" });
	const user = await Auth.signIn(Email, Password).catch(error => {
		dispatch({ type: "LOGIN_ERROR", error: error.message });
	});

	if(user) {
		dispatch({ type: "LOGIN_SUCCESS", payload: user });
		localStorage.setItem("currentUser", user);
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

export async function userPasswordForgotSubmit(dispatch, email, code, newPassword) {
	try {
		dispatch({ type: "REQUEST_LOGIN" });
		let data = await Auth.forgotPasswordSubmit(email, code, newPassword);
		dispatch({ type: "STOP_LOADING" });
		return data;
	} catch (error) {
		dispatch({ type: "LOGIN_ERROR", error: error.message });
	}
}

export async function signUpUser(dispatch, email, password) {
	try {
		dispatch({ type: "REQUEST_LOGIN" });

		let user = await Auth.signUp({
			username: email,
			password,
			attributes: { email }
		});

		if (user) {
			dispatch({ type: "LOGIN_SUCCESS", payload: user });
			localStorage.setItem("currentUser", user);
			return user;	
		} 
		return;
	} catch (error) {
		dispatch({ type: "LOGIN_ERROR", error: error.message });
	}
}

export async function confirmEmail(dispatch, email, code) {
	const user = await Auth.confirmSignUp(email, code)
				.catch(error => {
					dispatch({ type: "CONFIRM_EMAIL_ERROR", error });
					return;
				});
	localStorage.setItem("currentUser", JSON.stringify(user));
	dispatch({ type: "LOGIN_SUCCESS", payload: user });
}

export async function logout(dispatch) {
	await Auth.signOut();
	dispatch({ type: "LOGOUT" });
	localStorage.removeItem("currentUser");
	localStorage.removeItem("token");
}
