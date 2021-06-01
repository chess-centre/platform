import React from "react";
import Top from "./TopSection";
import Bottom from "./BottomSection";

const Internal = () => {
  return (
    <div className="grid grid-cols-2 h-screen">
      <div>
        <Top />
      </div>
      <div>
        <Bottom />
      </div>
      
    </div>
  );
};

export default Internal;
