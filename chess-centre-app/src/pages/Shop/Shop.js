import React from "react";

function Shop() {
  const script = document.createElement("script");
  script.type = "text/javascript";
  script.src =
    "https://shop.spreadshirt.no/shopfiles/shopclient/shopclient.nocache.js";

  return (
    <div className="shopBody">
      <div id="myShop"></div>
    </div>
  );
}

export default Shop;
