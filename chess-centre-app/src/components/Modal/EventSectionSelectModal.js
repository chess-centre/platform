import React, { useState } from "react";
import { Modal, ModalBody, ModalFooter, Button } from "@windmill/react-ui";

export default function EventSectionSelectionModal(props) {
    const { handleRegister, eventId, open, closeModal } = props;
    const [isLoadingSignUp, setIsLoadingSignUp] = useState(false);
    const [section, setSection] = useState("open");

    const confirmRegister = async () => {
        console.log("section", section);
        setIsLoadingSignUp(true);
        await handleRegister(eventId, section);
        closeModal();
        setIsLoadingSignUp(false);
    };

    return (
        <Modal isOpen={open} onClose={closeModal}>
            <ModalBody>
                <div>
                    <div className="my-4 mx-10">
                        <label htmlFor="section" className="blocktext-lg text-gray-700 text-center">
                            Select your section
                        </label>
                        <select
                            onChange={e => setSection(e.target.value.toLocaleLowerCase())}
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

            </ModalBody>
            <ModalFooter>
                <Button className="inline-flex items-center px-2.5 py-1.5 border border-transparent text-xs font-medium rounded shadow-sm text-white bg-teal-600 hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500"
                    onClick={() => confirmRegister()}>
                    {isLoadingSignUp ? (
                        <div className="flex">
                            <i className="fas fa-spinner-third animate-spin"></i>
                            <span className="ml-2 text-xs">Loading</span>
                        </div>
                    ) : (
                        `Confirm & Pay`
                    )}
                </Button>
            </ModalFooter>
        </Modal>
    );
}