import { Auth } from "aws-amplify";
import { Button } from "@windmill/react-ui";
import React, { useState } from "react";

export default function Register(props) {
  const { register, id } = props;
  const [isLoadingEvents, setIsLoadingEvent] = useState(false);
  const handleRegister = async (id) => {
    setIsLoadingEvent(true);
    await Auth.currentUserCredentials();
    await register(id);
    setIsLoadingEvent(false);
  };

  return (
    <>
      <Button className="text-right text-xs" onClick={() => handleRegister(id)}>
        {isLoadingEvents ? (
          <div className="flex">
            <i className="fas fa-spinner-third animate-spin"></i>
            <span className="ml-2 text-xs sm:text-sm">Loading</span>
          </div>
        ) : (
          `Sign up` 
        )}
      </Button>
    </>
  );
}
