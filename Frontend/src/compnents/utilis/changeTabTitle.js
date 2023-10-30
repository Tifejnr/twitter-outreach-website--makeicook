import React from "react";
// import googleTagManagerLoad from "./google-tag-manager/googleTagManager";

function changeTabTitle(newTitle) {
  return (document.title = newTitle);
}

export { changeTabTitle };
