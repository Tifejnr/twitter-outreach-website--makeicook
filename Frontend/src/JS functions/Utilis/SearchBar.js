//serach functionality//

function searchInput() {
  const allBoardsClass = document.getElementsByClassName("boardListItem");
  const searchTextRaw = document.getElementById("search");
  const searchText1 = searchTextRaw.value;
  let searchText = searchText1.replace(/\s/g, "").toLowerCase();

  Array.from(allBoardsClass).forEach(function (recipe) {
    if (searchText.length === 0) {
      recipe.style.display = "block";
    } else {
      const nameElement = recipe.getElementsByTagName("p")[0];

      if (
        nameElement &&
        nameElement.innerText
          .replace(/\s/g, "")
          .toLowerCase()
          .indexOf(searchText) > -1
      ) {
        recipe.style.display = "block";
      } else {
        recipe.style.display = "none";
      }
    }
  });
}

function searchMemberList() {
  const searchTextRaw = document.getElementById("searchMembersList");
  const searchText1 = searchTextRaw.value;
  let searchText = searchText1.replace(/\s/g, "").toLowerCase();

  const allEleClass = document.getElementsByClassName("member-list-form");

  Array.from(allEleClass).forEach(function (eleContainer) {
    if (searchText.length === 0) {
      eleContainer.style.display = "block";
    } else {
      const paragraphElement = eleContainer.getElementsByTagName("p")[0];

      if (
        paragraphElement &&
        paragraphElement.innerText
          .replace(/\s/g, "")
          .toLowerCase()
          .indexOf(searchText) > -1
      ) {
        eleContainer.style.display = "block";
      } else {
        eleContainer.style.display = "none";
      }
    }
  });
}

export { searchInput, searchMemberList };
