import { Auth } from "aws-amplify";
import { Button } from "@windmill/react-ui";
import React, { useState } from "react";

export default function Register(props) {
  const { register, id } = props;
  const [isLoadingSignUp, setIsLoadingSignUp] = useState(false);
  const handleRegister = async (id) => {
    setIsLoadingSignUp(true);
    await Auth.currentUserCredentials();
    await register(id);
    setIsLoadingSignUp(false);
  };

  return (
    <>
      <Button className="inline-flex items-center px-2.5 py-1.5 border border-transparent text-xs font-medium rounded shadow-sm text-white bg-teal-600 hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500" onClick={() => handleRegister(id)}>
        {isLoadingSignUp ? (
          <div className="flex">
            <i className="fas fa-spinner-third animate-spin"></i>
            <span className="ml-2 text-xs">Loading</span>
          </div>
        ) : (
          `Sign up` 
        )}
      </Button>
    </>
  );
}
