import React from "react";
import { Modal, ModalBody, ModalFooter } from "@windmill/react-ui";
import RoundTimes from "../RoundTimes/Rounds";

export default function RoundTimesModal(props) {
  const { eventId, eventType, open, closeModal } = props;

  return (
    <Modal isOpen={open} onClose={closeModal}>
      <ModalBody>
        <RoundTimes {...{ eventId, eventType }} removeStyles={true} />
      </ModalBody>
      <ModalFooter>
        <button
          className="w-full mb-2 items-center px-3 py-2 border border-transparent shadow text-sm leading-4 
                font-medium rounded-md text-white bg-teal-600 hover:bg-teal-500 focus:outline-none focus:ring-2 
                focus:ring-offset-2 focus:ring-teal-500"
          onClick={closeModal}
        >
          Close
        </button>
      </ModalFooter>
    </Modal>
  );
}
