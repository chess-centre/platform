import React from "react";
import {
  Modal,
  ModalBody,
  ModalFooter,
  Button,
  ModalHeader,
} from "@windmill/react-ui";

export default function AddMyProfileImageModel({
  open,
  closeModal,
  handle,
  status,
}) {
  const handleChallengeEvent = () => {
    window.open(`https://lichess.org/?user=${handle}#friend`);
  };

  const renderStatus = (status) => {
    switch (status) {
      case "Online":
        return (
          <span className="text-green-600 font-medium text-xl">{status}</span>
        );
      case "Offline":
        return (
          <span className="text-gray-500 font-medium text-xl">{status}</span>
        );
      default:
        return (
          <span className="text-gray-500 font-medium text-xl">Offline</span>
        );
    }
  };

  return (
    <Modal isOpen={open} onClose={closeModal}>
      <ModalHeader className="mb-4 -mt-4 text-center">
        <i className="fas fa-crown text-7xl text-yellow-400"></i>
      </ModalHeader>
      <ModalBody className="px-4 text-center">
        <div className="mb-4">
          <p className="mb-4 font-extrabold text-2xl">{handle}</p>
          <p className="mb-4">{renderStatus(status)}</p>
          <button
            type="button"
            onClick={handleChallengeEvent}
            className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Issue Challenge
          </button>
        </div>
      </ModalBody>
      <ModalFooter className="py-2">
        <Button className="w-full mb-2" onClick={closeModal}>
          Close
        </Button>
      </ModalFooter>
    </Modal>
  );
}
