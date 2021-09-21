import React from "react";
import { Modal, ModalBody, ModalFooter, Button } from "@windmill/react-ui";
import PGNViewer from "../ChessBoard/ChessBoard";

export default function GameViewerModal({ open, closeModal, pgn, liChessUrl }) {
  let game = undefined;

  if (pgn) {
    game = pgn.replace(/["']/g, '"');
  }

  return (
    <>
      <Modal isOpen={open} onClose={() => closeModal()}>
        <ModalBody>
          <h1 className="prose prose-md sm:prose-xl text-center font-bold">
            Game Viewer
          </h1>

          {game && <PGNViewer layout={"top"}>{game}</PGNViewer>}
        </ModalBody>
        <ModalFooter className="bg-gray-100 flex items-stretch m-auto">
          {liChessUrl && (
            <div className="relative m-auto inline-flex gap-3">
              <a
                className="inline-flex m-auto w-full whitespace-nowrap items-center px-10 py-2 border shadow-sm text-sm font-medium rounded-lg text-gray-700 bg-white hover:bg-gray-50 focus:ring-2 focus:ring-offset-2 focus:ring-teal-500"
                target="_blank"
                rel="noreferrer"
                href={liChessUrl}
              >
                Lichess analysis
              </a>
              <button
                className="inline-flex m-auto w-full items-center px-10 py-2 border shadow-sm text-sm font-medium rounded-lg text-white bg-teal-600 hover:bg-teal-700 focus:ring-2 focus:ring-offset-2 focus:ring-teal-500"
                onClick={closeModal}
              >
                Close
              </button>
            </div>
          )}

          {!liChessUrl && (
            <Button className="m-auto w-full sm:mx-20 mb-2" onClick={closeModal}>
              Close
            </Button>
          )}
        </ModalFooter>
      </Modal>
    </>
  );
}
