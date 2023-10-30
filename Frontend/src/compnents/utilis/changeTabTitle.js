import React from "react";
import googleTagManagerLoad from "./google-tag-manager/googleTagManager";

function changeTabTitle(newTitle) {
  googleTagManagerLoad();
  return (document.title = newTitle);
}

export { changeTabTitle };
