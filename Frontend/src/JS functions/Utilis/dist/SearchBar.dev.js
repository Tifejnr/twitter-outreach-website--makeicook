"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.searchInput = searchInput;
exports.searchMemberList = searchMemberList;

//serach functionality//
function searchInput() {
  var allBoardsClass = document.getElementsByClassName("boardListItem");
  var searchTextRaw = document.getElementById("search");
  var searchText1 = searchTextRaw.value;
  var searchText = searchText1.replace(/\s/g, "").toLowerCase();
  Array.from(allBoardsClass).forEach(function (recipe) {
    if (searchText.length === 0) {
      recipe.style.display = "block";
    } else {
      var nameElement = recipe.getElementsByTagName("p")[0];

      if (nameElement && nameElement.innerText.replace(/\s/g, "").toLowerCase().indexOf(searchText) > -1) {
        recipe.style.display = "block";
      } else {
        recipe.style.display = "none";
      }
    }
  });
}

function searchMemberList() {
  var searchTextRaw = document.getElementById("searchMembersList");
  var searchText1 = searchTextRaw.value;
  var searchText = searchText1.replace(/\s/g, "").toLowerCase();
  var allEleClass = document.getElementsByClassName("eachMemberListCont");
  Array.from(allEleClass).forEach(function (eleContainer) {
    if (searchText.length === 0) {
      eleContainer.style.display = "grid";
    } else {
      var paragraphElement = eleContainer.getElementsByTagName("p")[0];

      if (paragraphElement && paragraphElement.innerText.replace(/\s/g, "").toLowerCase().indexOf(searchText) > -1) {
        eleContainer.style.display = "grid";
      } else {
        eleContainer.style.display = "none";
      }
    }
  });
}