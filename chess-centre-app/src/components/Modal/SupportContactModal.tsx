import React from "react";
import { Link } from "react-router-dom";
import { Modal, ModalBody, ModalFooter } from "@windmill/react-ui";

export default function SupportContactModal(props) {
  const { open, closeModal } = props;

  return (
    <Modal isOpen={open} onClose={closeModal}>
      <ModalBody>
        <div className="pt-4">
          <div className="flow-root bg-gray-50 rounded-lg px-5 pb-8">
            <div className="relative">
              <h3 className="mt-2 text-lg font-medium text-gray-900 tracking-tight">
                <span className="text-teal-600">
                  <i className="fas fa-user-headset"></i>
                </span>{" "}
                Support
              </h3>
              <p className="mt-3 text-sm text-gray-500">
                We aim to respond and resolve your issues as quickly as possible
                (usually within 24 hours).
              </p>
              <p className="mt-3 text-sm text-gray-500">
                <i className="fad fa-credit-card"></i> <br />
                If your issue is regarding{" "}
                <span className="font-semibold">paid membership</span>, these
                can mostly be resolved via the "subscription" tab under your{" "}
                <Link
                  className="font-semibold text-teal-500 hover:text-teal-700"
                  to="profile"
                >
                  profile
                </Link>
                .
              </p>
              <p className="mt-3 text-sm text-gray-500">
                <i className="fad fa-laptop-code"></i> <br />
                If your issue is regarding{" "}
                <span className="font-semibold">app functionality</span>, you
                can raise these{" "}
                <a
                  className="font-semibold text-teal-500 hover:text-teal-700"
                  href="https://github.com/chess-centre/platform/issues"
                >
                  here
                </a>
                .
              </p>
              <p className="mt-3 text-sm text-gray-500">
                <i className="fad fa-ambulance"></i> <br />
                However, if you are really struggling and just need assistance,
                please don't hesitate to{" "}
                <a
                  className="font-semibold text-teal-500 hover:text-teal-700"
                  href="mailto:support@chesscentre.online?subject=Help!"
                >
                  contact us
                </a>
                .
              </p>
              <p className="mt-3 text-sm text-gray-500">
                Unfortunately, we have no official support team (as everyone is
                a volunteer ❤️) so please bear with us!
              </p>
            </div>
          </div>
        </div>
      </ModalBody>
      <ModalFooter>
        <button
          className={`w-full items-center px-3 py-2 border border-transparent shadow text-sm leading-4 
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
