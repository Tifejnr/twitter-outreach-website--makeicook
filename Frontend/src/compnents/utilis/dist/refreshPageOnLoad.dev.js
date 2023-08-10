"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = handlePageRefreshOnLoad;

function handlePageRefreshOnLoad(pageLink) {
  window.location.href = pageLink;
}