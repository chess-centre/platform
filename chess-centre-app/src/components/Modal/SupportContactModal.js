import React from "react";
import { Link } from "react-router-dom";
import {
  Modal,
  ModalBody,
  ModalFooter,
  Button,
} from "@windmill/react-ui";

export default function SupportContactModal(props) {
  const { open, closeModal } = props;

  return (
    <>
      <Modal isOpen={open} onClose={() => closeModal()}>
        <ModalBody>
          <div className="pt-6">
            <div className="flow-root bg-gray-50 rounded-lg px-5 pb-8">
              <div className="relative">
                <h3 className="mt-2 text-lg font-medium text-gray-900 tracking-tight">
                  <span className="text-teal-600"><i className="fas fa-user-headset"></i></span> Support
                </h3>
                <p className="mt-3 text-sm text-gray-500">
                  Unfortunately, we don't have any official support team (<span className="italic">as
                  everyone is a volunteer </span>❤️).
                </p>
                <p className="mt-3 text-sm text-gray-500">
                  We will however try to respond and resolve your issues as
                  quickly as possible.
                </p>
                <p className="mt-3 text-sm text-gray-500">
                  <i className="fad fa-credit-card"></i> <br />
                  If your issue is regarding{" "}
                  <span className="font-semibold">
                    payments &#38; membership
                  </span>
                  , these can mostly be resolved via the "subsciption" tab under
                  your <Link className="font-semibold text-teal-500 hover:text-teal-700" to="profile">profile</Link>.
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
                  Finally, if you are really struggling and need assistance,
                  please don't hesitate to{" "}
                  <a
                    className="font-semibold text-teal-500 hover:text-teal-700"
                    href="mailto:support@chesscentre.online"
                  >
                    contact us
                  </a>
                  .
                </p>
              </div>
            </div>
          </div>
        </ModalBody>
        <ModalFooter>
          <Button className="w-full sm:w-auto" onClick={closeModal}>
            Close
          </Button>
        </ModalFooter>
      </Modal>
    </>
  );
}
