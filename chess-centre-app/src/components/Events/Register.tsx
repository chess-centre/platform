import { Auth } from "aws-amplify";
import React, { useState } from "react";
import EventSectionSelectionModal from "../Modal/EventSectionSelectModal";
import ConfirmEntryModal from "../Modal/ConfirmEntryModal";
import { juniorSections, standardSections } from "../../api/sections";

interface RegisterProps {
  id: string;
  multipleSections: boolean;
  showByes: boolean;
  isJunior: boolean;
  isMember: boolean;
  memberEntry: boolean;
  register: Function;
}

export default function Register(props: RegisterProps) {
  const { id, multipleSections, showByes, isJunior, isMember, memberEntry, register } = props;
  const [isLoadingSignUp, setIsLoadingSignUp] = useState(false);
  const [modelOpen, setModalOpen] = useState(false);
  const [confirmEntryModalOpen, setConfirmEntryModalOpen] = useState<Boolean>(
    false
  );

  const handleRegister = async (
    id: string,
    section: string | undefined,
    byes: any
  ) => {
    setIsLoadingSignUp(true);
    await Auth.currentUserCredentials();
    await register(id, section, byes);
    setIsLoadingSignUp(false);
  };

  const openSectionSelectionModal = () => {
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  const openConfirmMemberEntryModal = () => {
    setConfirmEntryModalOpen(true);
  };

  const confirmEntryModalClose = () => {
    setConfirmEntryModalOpen(false);
  };

  const sections = isJunior ? juniorSections : standardSections;

  return (
    <div>
      {multipleSections && (
        <button
          className="inline-flex items-center px-2.5 py-1.5 border border-transparent text-sm font-medium 
            rounded-md shadow-md text-white bg-teal-600 hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500"
          onClick={() => openSectionSelectionModal()}
        >
          Register
        </button>
      )}

      {isLoadingSignUp && !multipleSections && (
        <div
          className="inline-flex items-center px-2.5 py-1.5 border border-transparent text-sm font-medium 
        rounded-md shadow-md text-white bg-teal-600 hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500"
        >
          <i className="fas fa-spinner-third animate-spin"></i>
          <span className="ml-2 text-sm">Loading</span>
        </div>
      )}

      {!isLoadingSignUp && !multipleSections && (!memberEntry || !isMember) && (
        <button
          className="inline-flex items-center px-2.5 py-1.5 border border-transparent text-sm font-medium 
        rounded-md shadow-md text-white bg-teal-600 hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500"
          onClick={() => handleRegister(id, undefined, undefined)}
        >
          Register
        </button>
      )}

      {!multipleSections && !isLoadingSignUp && isMember && memberEntry && (
        <button
          className="inline-flex w-full sm:w-auto justify-center px-4 py-2 border border-teal-600 shadow-sm text-sm font-medium rounded-md text-white bg-teal-600 hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500"
          onClick={() => openConfirmMemberEntryModal()}
        >
          Register
        </button>
      )}

      <EventSectionSelectionModal
        key={id}
        showByes={showByes}
        eventId={id}
        handleRegister={handleRegister}
        open={modelOpen}
        closeModal={closeModal}
        sections={sections}
      />

      <ConfirmEntryModal
        eventId={id}
        open={confirmEntryModalOpen}
        cancel={confirmEntryModalClose}
        handleRegister={handleRegister}
      />
    </div>
  );
}
