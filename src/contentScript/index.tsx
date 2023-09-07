import React from "react";
import ReactDOM from "react-dom";
import "../assets/tailwind.css";
import ContentScript from "./contentScript";

function init() {
  const bodyContainer = document.getElementsByTagName("body")[0];
  if (!bodyContainer) {
    throw new Error("Cannot find the body element");
  }

  const appContainer = document.createElement("div");
  bodyContainer.appendChild(appContainer);
  ReactDOM.render(<ContentScript />, appContainer);
}

init();
