import React from "react";
import {
  Modal,
  ModalBody,
  ModalFooter,
  Button,
} from "@windmill/react-ui";
import RoundTimes from "../RoundTimes/Rounds";

export default function RoundTimesModal(props) {

  const { eventId, eventType, open, closeModal } = props;

  return (
    <>
      <Modal isOpen={open} onClose={() => closeModal()} >
          <ModalBody> 
            <RoundTimes eventId={eventId} eventType={eventType} removeStyles={true} />
          </ModalBody >
        <ModalFooter>
          <Button className="w-full sm:w-auto mb-2" onClick={closeModal}>
            Close
          </Button>
        </ModalFooter>
      </Modal>
    </>
  );
};