import React from "react";
import { Modal, ModalBody, ModalFooter, ModalHeader } from "@windmill/react-ui";
import ChesscomFetch from "../../pages/App/User/sections/Chesscom";

export default function AddMyProfileImageModel({
  open,
  currentUserInfo,
  closeModal,
  setAvatar,
}) {
  return (
    <Modal isOpen={open} onClose={closeModal}>
      <ModalHeader className="mb-4 -mt-4">
        <i className="fad fa-question-circle text-teal-600 text-4xl"></i> Adding
        your profile image
      </ModalHeader>
      <ModalBody className="px-4">
        <div className="prose prose-sm ml-2 mb-4">
          <p>
            We pull user profile images from your{" "}
            <span className="font-medium">chess.com</span> accounts (if you have
            one).
          </p>
          <p>
            To include yours add your{" "}
            <span className="font-medium">chess.com</span> username and click{" "}
            <span className="font-medium">Sync</span> to retrieve your profile
            image.
          </p>
        </div>
        <ChesscomFetch {...{ ...currentUserInfo, setAvatar }} />
      </ModalBody>
      <ModalFooter className="py-2">
        <button
          className={`w-full mb-2 items-center px-3 py-2 border border-transparent shadow text-sm leading-4 
                font-medium rounded-md text-white bg-teal-600 hover:bg-teal-500 focus:outline-none focus:ring-2 
                focus:ring-offset-2 focus:ring-teal-500`}
          onClick={closeModal}
        >
          Close
        </button>
      </ModalFooter>
    </Modal>
  );
}
