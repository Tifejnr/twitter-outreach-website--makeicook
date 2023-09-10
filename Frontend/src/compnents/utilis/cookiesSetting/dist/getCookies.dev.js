"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = getCookies;

var _jsCookie = _interopRequireDefault(require("js-cookie"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var cookieName = "cftAuth";

function getCookies() {
  var cookieValue = _jsCookie["default"].get(cookieName);

  return cookieValue;
}