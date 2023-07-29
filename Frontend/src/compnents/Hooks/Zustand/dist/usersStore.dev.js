"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _zustand = require("zustand");

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

var useStore = (0, _zustand.create)(function (set) {
  return {
    creditsFromServer: "",
    setCreditsFromServer: function setCreditsFromServer(fetchedCredits) {
      return set(function (state) {
        return {
          creditsFromServer: fetchedCredits
        };
      });
    },
    count: 0,
    // Function to increment the count
    increment: function increment() {
      return set(function (state) {
        return {
          count: state.count + 1
        };
      });
    },
    checkboxesArray: [],
    // Function to push a new string into the checkboxesArray
    pushCheckboxesArray: function pushCheckboxesArray(newString) {
      return set(function (state) {
        return {
          checkboxesArray: [].concat(_toConsumableArray(state.checkboxesArray), [newString])
        };
      });
    }
  };
});
var _default = useStore;
exports["default"] = _default;