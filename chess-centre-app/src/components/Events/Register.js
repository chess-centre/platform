import { Button } from "@windmill/react-ui";
import React, { useState } from "react";

export default function Register(props) {
  const { register, id } = props;
  const [isLoadingEvents, setIsLoadingEvent] = useState(false);
  const [x,y,z] = ["n ","Sig","up"];
  const handleRegister = async (id) => {
    setIsLoadingEvent(true);
    await register(id);
    setIsLoadingEvent(false);
  };

  return (
    <>
      <Button className="text-right" onClick={() => handleRegister(id)}>
        {isLoadingEvents ? (
          <div>
            <i className="fas fa-spinner-third animate-spin"></i>
            <span className="ml-2 text-xs sm:text-sm">Redirecting</span>
          </div>
        ) : (
          `${y}${x}${z}` 
        )}
      </Button>
    </>
  );
}
