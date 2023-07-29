"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _zustand = require("zustand");

var useStore = (0, _zustand.create)(function (set) {
  return {
    creditsFromServer: "",
    setCreditsFromServer: function setCreditsFromServer(fetchedCredits) {
      return set(function (state) {
        return {
          creditsFromServer: fetchedCredits
        };
      });
    }
  };
});
var _default = useStore;
exports["default"] = _default;