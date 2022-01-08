import React from "react";
import {
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
} from "@windmill/react-ui";

function CookieTermsModal(props) {
  const { isCookieModalOpen, closeCookieModal, acceptCookies } = props;

  const handleAcceptTerms = () => {
    acceptCookies(true);
    closeCookieModal();
  };

  return (
    <Modal isOpen={isCookieModalOpen} onClose={closeCookieModal}>
      <ModalHeader className="-mt-2">Our Application Uses Cookies</ModalHeader>
      <ModalBody>
        <p className="mb-2">
          Our application cannot function properly without these cookies, they
          can only be disabled by changing your browser preferences.
        </p>
        <p className="mb-2">
          These cookies are not for ad-tracking or personal data scraping. Our
          cookies are for application behaviours such as theme and device
          preferences.
        </p>
        <p className="mb-2">
          Please note if disabled our app may not work or show correctly on your
          device.
        </p>
      </ModalBody>
      <ModalFooter>
        <Button
          className="w-full sm:w-auto"
          onClick={() => handleAcceptTerms(true)}
        >
          Accept
        </Button>
      </ModalFooter>
    </Modal>
  );
}
export default CookieTermsModal;
