import React from "react";
import {
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
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
        <button
          className={`w-full sm:w-auto inline-flex items-center px-3 py-2 border border-transparent shadow text-sm leading-4 
          font-medium rounded-md text-white bg-teal-600 hover:bg-teal-500 focus:outline-none focus:ring-2 
          focus:ring-offset-2 focus:ring-teal-500`}
          onClick={() => handleAcceptTerms(true)}
        >
          Accept
        </button>
      </ModalFooter>
    </Modal>
  );
}
export default CookieTermsModal;
