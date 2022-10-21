import React from "react";
import { Dialog } from "@headlessui/react";
import PGNViewer from "../ChessBoard/ChessBoard";

export default function GameViewerModal({ open, closeModal, pgn, fileName }) {
  let game = undefined;

  if (pgn) {
    game = pgn.replace(/["']/g, '"');
  }

  function downloadPGN(filename: string, data: string | undefined) {
    if(!data) return;
    const blob = new Blob([data], { type: "application/vnd.chess-pgn" });
    const elem = window.document.createElement("a");
    elem.href = window.URL.createObjectURL(blob);
    elem.download = `${filename}.pgn`;
    document.body.appendChild(elem);
    elem.click();
    document.body.removeChild(elem);
  }

  return (
    <Dialog as="div" className="relative z-50" onClose={closeModal} open={open}>
      <div className="fixed inset-0 z-50 overflow-y-auto">
        <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
          <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white border-2 border-gray-100 px-4 pt-5 pb-4 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg sm:p-6">
            <div>
              <div className="mt-3 text-center sm:mt-5">
                <div className="mt-2">
                  {game && <PGNViewer layout={"top"}>{game}</PGNViewer>}
                </div>
              </div>
            </div>
            <div className="mt-5 sm:mt-6 flex gap-4 sm:mx-8">
              <button
                type="button"
                className="inline-flex w-full justify-center rounded-md border border-gray-200 bg-gray-100 px-4 py-2 text-base font-medium text-black shadow-sm hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2 sm:text-sm"
                onClick={closeModal}
              >
                Close
              </button>
              {game && (
                <button
                  type="button"
                  className="inline-flex w-full justify-center rounded-md border border-transparent bg-sky-700 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-sky-800 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-offset-2 sm:text-sm"
                  onClick={() => downloadPGN(fileName, game)}
                >
                  Download PGN
                </button>
              )}
            </div>
          </Dialog.Panel>
        </div>
      </div>
    </Dialog>
  );
}
