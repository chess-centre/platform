import { Auth } from "aws-amplify";
import React, { useState } from "react";
import EventSectionSelectionModal from "../Modal/EventSectionSelectModal";

export default function Register(props) {
  const { register, id, multipleSections, showByes } = props;
  const [isLoadingSignUp, setIsLoadingSignUp] = useState(false);
  const [modelOpen, setModalOpen] = useState(false);
  const handleRegister = async (id, section, byes) => {
    setIsLoadingSignUp(true);
    await Auth.currentUserCredentials();
    await register(id, section, byes);
    setIsLoadingSignUp(false);
  };

  const openSectionSelectionModal = () => {
    setModalOpen(true);
  }

  const closeModal = () => {
    setModalOpen(false);
  }

  return (
    <>
      {multipleSections ?
        <>
          <button className="inline-flex items-center px-2.5 py-1.5 border border-transparent text-xs font-medium rounded shadow-sm text-white bg-teal-600 hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500"
            onClick={() => openSectionSelectionModal(id)}>
            Sign up
          </button>
        </> :
        <button className="inline-flex items-center px-2.5 py-1.5 border border-transparent text-xs font-medium rounded shadow-sm text-white bg-teal-600 hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500"
          onClick={() => handleRegister(id)}>
          {isLoadingSignUp ? (
            <div className="flex">
              <i className="fas fa-spinner-third animate-spin"></i>
              <span className="ml-2 text-xs">Loading</span>
            </div>
          ) : (
            `Sign up`
          )}
        </button>}
      <EventSectionSelectionModal showByes={showByes} eventId={id} handleRegister={handleRegister} open={modelOpen} closeModal={closeModal} />
    </>
  );
}
