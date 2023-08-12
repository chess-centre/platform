import React from "react";
import { Modal, ModalBody, ModalFooter } from "@windmill/react-ui";
import RoundTimes from "../RoundTimes/Rounds";

export default function RoundTimesModal(props) {
  const { eventId, eventType, open, closeModal, eventName } = props;

  let type = eventType;

  // TODO: event types NEED to be refactored
  if(eventName && eventName.includes("Festival Blitz")) {
    type = "festival-blitz";
  }

  return (
    <Modal isOpen={open} onClose={closeModal}>
      <ModalBody>
        <RoundTimes eventId={eventId} eventType={type} removeStyles={true} />
      </ModalBody>
      <ModalFooter>
        <button
          className="w-full mb-2 items-center px-3 py-2 border border-transparent shadow text-sm leading-4 
                font-medium rounded-md text-white bg-yellow-500 hover:bg-yellow-400 focus:outline-none focus:ring-2 
                focus:ring-offset-2 focus:ring-yellow-400"
          onClick={closeModal}
        >
          Close
        </button>
      </ModalFooter>
    </Modal>
  );
}
