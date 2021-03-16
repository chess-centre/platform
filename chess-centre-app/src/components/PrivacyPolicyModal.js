import React, { useState } from "react";
import {
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
} from "@windmill/react-ui";

function PrivacyPolicyModal() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  function openModal() {
    setIsModalOpen(true);
  }
  function closeModal() {
    setIsModalOpen(false);
  }
  return (
    <>
      <div>
        <Button onClick={openModal}>Open modal</Button>
      </div>
      <Modal isOpen={isModalOpen} onClose={closeModal}>
        <ModalHeader>Privacy Policy</ModalHeader>
        <ModalBody>Privacy Policy Here</ModalBody>
        <ModalFooter>
          <Button
            className="w-full sm:w-auto"
            layout="outline"
            onClick={closeModal}
          >
            Cancel
          </Button>
          <Button className="w-full sm:w-auto">Accept</Button>
        </ModalFooter>
      </Modal>
    </>
  );
}
export default PrivacyPolicyModal;
