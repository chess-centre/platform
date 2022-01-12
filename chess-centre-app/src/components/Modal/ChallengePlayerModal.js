import React from "react";
import {
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
} from "@windmill/react-ui";

export default function ChallengePlayerModal({ closeModal, data }) {

  const handleChallengeEvent = () => {
    window.open(`https://lichess.org/?user=${data.handle}#friend`);
  };

  const handleWatchEvent = (id) => {
    window.open(`https://lichess.org/${id}`);
  };

  const renderStatus = (status) => {
    return status ? (
      <span className="text-green-600 font-medium text-xl">Online</span>
    ) : (
      <span className="text-gray-500 font-medium text-xl">Offline</span>
    );
  };

  return (
    <Modal isOpen={data.open} onClose={closeModal}>
      <ModalHeader className="mb-4 -mt-4 text-center">
        <i className="fas fa-crown text-7xl text-yellow-400"></i>
      </ModalHeader>
      <ModalBody className="px-4 text-center">
        <div className="mb-4">
          <p className="mb-4 font-extrabold text-2xl">{data.handle}</p>
          <p className="mb-4">{renderStatus(data.online)}</p>
          <p className="mb-4">
            {data.data.playing && data.data.playingId && (
              <button
                type="button"
                onClick={() => handleWatchEvent(data.data.playingId)}
                className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-50 bg-teal-700 hover:bg-teal-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500"
              >
                Watch Game
              </button>
            )}
          </p>
          <p>
            <button
              type="button"
              onClick={handleChallengeEvent}
              className="inline-flex items-center px-6 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500"
            >
              Challenge
            </button>
          </p>
        </div>
      </ModalBody>
      <ModalFooter className="py-2 bg-gray-200">
        <button
          className="w-full mb-2 items-center px-6 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500"
          onClick={closeModal}
        >
          Close
        </button>
      </ModalFooter>
    </Modal>
  );
}
