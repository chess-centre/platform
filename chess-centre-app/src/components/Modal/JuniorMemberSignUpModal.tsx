import React from "react";
import {
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
} from "@windmill/react-ui";

export default function RoundTimesModal(props) {
  const { open, closeModal } = props;

  return (
    <Modal isOpen={open} onClose={closeModal}>
      <ModalHeader className="-mt-4">Junior Member</ModalHeader>
      <ModalBody>
        <h2 className="text-1xl font-semibold text-gray-700 mb-4">
          Tips &#38; Advice
        </h2>
        <ul className="mt-2 space-y-2 grid">
          <li className="flex items-start col-span-1">
            <div className="flex-shrink-0">
              <span className="text-green-400">
                <i className="fas fa-check-circle"></i>
              </span>
            </div>
            <p className="ml-3 text-sm text-gray-700">
              You should create the account in their name*
            </p>
          </li>
          <li className="flex items-start col-span-1">
            <div className="flex-shrink-0">
              <span className="text-green-400">
                <i className="fas fa-check-circle"></i>
              </span>
            </div>
            <p className="ml-3 text-sm text-gray-700">
              You can use your own email or theirs
            </p>
          </li>
        </ul>
        <div className="mt-4 italic">
          * This is so we can track their progress in upcoming events and
          competitions.
        </div>
        <h2 className="text-1xl mt-4 font-semibold text-gray-700 mb-2">
          Multiple accounts
        </h2>
        <p className="">
          If you are signing up multiple children, you can take advantage of
          email{" "}
          <a
            href="http://zemalf.com/1418/email-sub-addressing/"
            target="_blank"
            rel="noreferrer"
          >
            subaddressing
          </a>{" "}
          to help manage these.
        </p>
        <div className="mt-2 mb-2">
          <p className="mb-2">Example:</p>
          <p>
            <span className="text-blue-700">parent@email.com</span>{" "}
            <span className="text-xs">{"<--"} your actual email</span>
          </p>
          <p>
            <span className="text-blue-700">parent+childsname@email.com</span>{" "}
            <span className="text-xs">{"<--"} use the "+" symbol</span>
          </p>
          <p className="mt-2">
            Here you can create mutliple subaddress emails which will still go
            to your inbox but allow you to register multiple accounts on our
            platform.
          </p>
          <p className="mt-2">
            Need further help?{" "}
            <a
              className="text-yellow-500 hover:text-yellow-800"
              href="mailto:info@chesscentre.online?subject=Junior Membership | Help"
            >
              Contact us
            </a>
          </p>
        </div>
      </ModalBody>
      <ModalFooter>
        <button className={`w-full mb-2 items-center px-3 py-2 border border-transparent shadow text-sm leading-4 
                font-medium rounded-md text-white bg-yellow-500 hover:bg-yellow-400 focus:outline-none focus:ring-2 
                focus:ring-offset-2 focus:ring-yellow-400`} onClick={closeModal}>
          Close
        </button>
      </ModalFooter>
    </Modal>
  );
}
