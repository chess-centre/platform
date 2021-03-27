import React, { useLayoutEffect } from "react";
import Children from "react-children-utilities";
import * as uuid from "uuid";
import { pgnView } from "@mliebelt/pgn-viewer";
import "./custom-board-styles.css";

function PGNViewer(props) {
  const { layout }  = props;
  const gameDecription = Children.onlyText(props.children);
  const id = "board-" + uuid.v4();

  useLayoutEffect(() => {
    pgnView(id, {
      pgn: gameDecription,
      mode: "view",
      theme: "informator",
      layout: layout,
      hideMovesBefore: true,
      locale: "en",
      showResult: true,
      boardSize: "300",
      showFen: false,
      pieceStyle: "alpha",
    });
  });

  return <div id={id}></div>;
}

export default PGNViewer;
