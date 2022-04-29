import React, { useState } from "react";
import { Modal, ModalBody, ModalFooter } from "@windmill/react-ui";

export default function EventSectionSelectionModal(props) {
  const { handleRegister, eventId, open, closeModal, showByes } = props;
  const [isLoadingSignUp, setIsLoadingSignUp] = useState(false);
  const [section, setSection] = useState("open");
  const [selectedRoundOne, setSelectedRoundOne] = useState(false);
  const [selectedRoundTwo, setSelectedRoundTwo] = useState(false);
  const [selectedRoundThree, setSelectedRoundThree] = useState(false);
  const [selectedRoundFour, setSelectedRoundFour] = useState(false);

  const getByes = () => {
    const r1 = selectedRoundOne ? "1" : "";
    const r2 = selectedRoundTwo ? "2" : "";
    const r3 = selectedRoundThree ? "3" : "";
    const r4 = selectedRoundFour ? "4" : "";
    return `${r1}${r2}${r3}${r4}`;
  };

  const confirmRegister = async () => {
    setIsLoadingSignUp(true);
    const byes = getByes();
    await handleRegister(eventId, section, byes);
    closeModal();
    setIsLoadingSignUp(false);
  };

  return (
    <Modal isOpen={open} onClose={closeModal}>
      <ModalBody>
        <div>
          <div className="my-4 mx-10">
            <label
              htmlFor="section"
              className="block text-md text-teal-700 text-center mb-2"
            >
              Select your section
            </label>
            <select
              onChange={(e) => setSection(e.target.value.toLocaleLowerCase())}
              id="section"
              name="section"
              className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-teal-500 focus:border-teal-500 sm:text-sm rounded-md"
              defaultValue="Open"
            >
              <option>Open</option>
              <option>Major</option>
              <option>Intermediate</option>
              <option>Minor</option>
            </select>
          </div>
        </div>
        {showByes && (
          <div>
            {" "}
            <div
              htmlFor="byes"
              className="block text-md text-teal-700 text-center mt-8"
            >
              Half point byes
            </div>
            <div className="sm:inline-flex sm:space-x-6 sm:ml-10 ml-24 mt-4">
              <div className="relative flex items-start mb-6">
                <div className="flex items-center h-5">
                  <input
                    defaultChecked={selectedRoundOne}
                    onChange={(e) =>
                      setSelectedRoundOne(e.currentTarget.checked)
                    }
                    id="round-two"
                    name="round-two"
                    type="checkbox"
                    className="focus:ring-teal-500 h-4 w-4 text-teal-600 border-gray-300 rounded"
                  />
                </div>
                <div className="ml-3 text-xs">
                  <label
                    htmlFor="candidates"
                    className="font-medium text-blue-brand"
                  >
                    Round 1
                  </label>
                </div>
              </div>
              <div className="relative flex items-start mb-6 sm:mb-0">
                <div className="flex items-center h-5">
                  <input
                    defaultChecked={selectedRoundTwo}
                    onChange={(e) =>
                      setSelectedRoundTwo(e.currentTarget.checked)
                    }
                    id="round-two"
                    name="round-two"
                    type="checkbox"
                    className="focus:ring-teal-500 h-4 w-4 text-teal-600 border-gray-300 rounded"
                  />
                </div>
                <div className="ml-3 text-xs">
                  <label
                    htmlFor="candidates"
                    className="font-medium text-blue-brand"
                  >
                    Round 2
                  </label>
                </div>
              </div>
              <div className="relative flex items-start mb-6 sm:mb-0">
                <div className="flex items-center h-5">
                  <input
                    defaultChecked={selectedRoundThree}
                    onChange={(e) =>
                      setSelectedRoundThree(e.currentTarget.checked)
                    }
                    id="round-three"
                    name="round-three"
                    type="checkbox"
                    className="focus:ring-teal-500 h-4 w-4 text-teal-600 border-gray-300 rounded"
                  />
                </div>
                <div className="ml-3 text-xs">
                  <label
                    htmlFor="offers"
                    className="font-medium text-blue-brand"
                  >
                    Round 3
                  </label>
                </div>
              </div>
              <div className="relative flex items-start mb-6 sm:mb-0">
                <div className="flex items-center h-5">
                  <input
                    defaultChecked={selectedRoundFour}
                    onChange={(e) =>
                      setSelectedRoundFour(e.currentTarget.checked)
                    }
                    id="round-four"
                    name="round-four"
                    type="checkbox"
                    className="focus:ring-teal-500 h-4 w-4 text-teal-600 border-gray-300 rounded"
                  />
                </div>
                <div className="ml-3 text-xs">
                  <label
                    htmlFor="offers"
                    className="font-medium text-blue-brand"
                  >
                    Round 4
                  </label>
                </div>
              </div>
            </div>
          </div>
        )}
      </ModalBody>
      <ModalFooter>
        <button
          className="inline-flex items-center px-2.5 py-1.5 border border-transparent text-xs font-medium rounded shadow-sm text-white bg-teal-600 hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500"
          onClick={() => confirmRegister()}
        >
          {isLoadingSignUp ? (
            <div className="flex">
              <i className="fas fa-spinner-third animate-spin"></i>
              <span className="ml-2 text-xs">Loading</span>
            </div>
          ) : (
            `Confirm & Pay`
          )}
        </button>
      </ModalFooter>
    </Modal>
  );
}
