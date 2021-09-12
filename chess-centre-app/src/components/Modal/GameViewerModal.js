import React from "react";
import { Modal, ModalBody, ModalFooter, Button } from "@windmill/react-ui";
import PGNViewer from "../ChessBoard/ChessBoard";

export default function GameViewerModal({ open, closeModal, pgn }) {

  let game = undefined;

  if(pgn) {
    game = pgn.replace(/["']/g, '"');
  }

  return (
    <>
      <Modal isOpen={open} onClose={() => closeModal()}>
        <ModalBody>
          <h1 className="prose prose-lg text-center font-bold">Game Viewer</h1>
          {game && <PGNViewer layout={"top"}>{game}</PGNViewer>}
        </ModalBody>
        <ModalFooter className="bg-gray-100">
          <Button className="w-full sm:mx-20 mb-2" onClick={closeModal}>
            Close
          </Button>
        </ModalFooter>
      </Modal>
    </>
  );
}
