import React from "react";
import {
    Modal,
    ModalBody,
    ModalFooter,
    Button,
    ModalHeader,
} from "@windmill/react-ui";

export default function AddMyProfileImageModel(props) {
    const { open, closeModal } = props;

    return (
        <>
            <Modal isOpen={open} onClose={() => closeModal()}>
                <ModalHeader>Add Profile Image</ModalHeader>
                <ModalBody>
                    <ul className="mt-2 space-y-2 grid">
                        <li className="flex items-start col-span-1">
                            <div className="flex-shrink-0">
                                <span className="text-green-400">
                                    <i className="fas fa-check-circle"></i>
                                </span>
                            </div>
                            <p className="ml-3 text-sm text-gray-700">You should have a chess.com account and an uploaded image on their profile.

                            </p>
                        </li>
                    </ul>
                    <p className="mt-2 mb-2">
                        <p>Go to your <b>profile</b> and in the <b>integration section</b> Enter your Chess.com username and click on the <b>"sync"</b> button</p>
                    </p>
                </ModalBody>
                <ModalFooter>
                    <Button className="w-full sm:w-auto mb-2" onClick={closeModal}>
                        Close
                    </Button>
                </ModalFooter>
            </Modal>
        </>
    );
}
