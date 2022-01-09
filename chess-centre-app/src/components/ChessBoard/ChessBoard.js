import React, { useLayoutEffect } from "react";
import Children from "react-children-utilities";
import * as uuid from "uuid";
import { pgnView } from "@mliebelt/pgn-viewer";
import "../../assets/css/additional-styles/chessboard.scss";

function PGNViewer(props) {
  const { layout, size, mode="view" }  = props;
  const gameDescription = Children.onlyText(props.children);
  const id = "board-" + uuid.v4();

  useLayoutEffect(() => {
    pgnView(id, {
      pgn: gameDescription,
      mode,
      theme: "informator",
      layout: layout,
      hideMovesBefore: true,
      locale: "en",
      showResult: true,
      boardSize: size,
      showFen: false,
      pieceStyle: "alpha",
    });
  });

  return <div id={id}></div>;
}

export default PGNViewer;
