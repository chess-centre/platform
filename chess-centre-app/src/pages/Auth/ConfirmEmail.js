import React, { useState } from "react";
import ImageLight from "../../assets/img/chess-players.jpg";
import ImageDark from "../../assets/img/chess-players.jpg";
import { Label, Input, Button } from "@windmill/react-ui";
import { useAuthDispatch, useAuthState } from "../../context/Auth";

function ConfirmEmail(props) {

    const [code, setCode] = useState("");
    const dispatch = useAuthDispatch();
    const { loading, errorMessage } = useAuthState();

    async function submitActivationCode() {
       
        if (!code) {
            dispatch({ type: "ACTIVATION_CODE_ERROR", error: "The code you entered is invalid" });
            return false;
        }
        else {

        }

    }


    return (
        <div className="flex items-center min-h-screen p-6 bg-gray-50 dark:bg-gray-900">
            <div className="flex-1 h-full max-w-4xl mx-auto overflow-hidden bg-white rounded-lg shadow-xl dark:bg-gray-800">
                <div className="flex flex-col overflow-y-auto md:flex-row">
                    <div className="h-32 md:h-auto md:w-1/2">
                        <img
                            aria-hidden="true"
                            className="object-cover w-full h-full dark:hidden"
                            src={ImageLight}
                            alt="Chess Players"
                        />
                        <img
                            aria-hidden="true"
                            className="hidden object-cover w-full h-full dark:block"
                            src={ImageDark}
                            alt="Chess Players"
                        />
                    </div>
                    <main className="flex items-center justify-center p-6 sm:p-12 md:w-1/2">
                        <div className="w-full">
                            {errorMessage && <p>{errorMessage}</p>}
                            <h1 className="mb-4 text-xl font-semibold text-gray-700 dark:text-gray-200">Account Activation</h1>
                            <Label>
                                <span>Code</span>
                                <Input disabled={loading} className="mt-1" onChange={(e) => setCode(e.target.value)} type="text" placeholder="Code" />
                            </Label>
                            <Button onClick={submitActivationCode} block className="mt-4"></Button>
                        </div>
                    </main>
                </div>
            </div>
        </div>
    )
}

export default ConfirmEmail
