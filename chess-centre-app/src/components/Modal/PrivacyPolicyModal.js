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
  function closeModal(accepted = false) {
    if (accepted) {
      // probably not necessary:
      window.localStorage.setItem("privacyPolicy", "accepted");
    }
    setIsModalOpen(false);
  }
  return (
    <>
      <span onClick={openModal} className="underline">
        privacy policy
      </span>
      <Modal isOpen={isModalOpen} onClose={() => closeModal(false)}>
        <ModalHeader>Privacy Policy</ModalHeader>
        <ModalBody>
          <iframe title="The Chess Centre | Privacy Policy" width="100%" src="/privacy-policy.html" sandbox="" />
        </ModalBody>
        <ModalFooter>
          <Button className="w-full sm:w-auto" onClick={() => closeModal(true)}>
            Accept
          </Button>
        </ModalFooter>
      </Modal>
    </>
  );
}
export default PrivacyPolicyModal;
