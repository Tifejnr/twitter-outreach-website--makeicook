//serach functionality//

function getReceipes() {
  return document.getElementsByClassName("item");
}

function searchInput() {
  const searchTextRaw = document.getElementById("search");
  const searchText1 = searchTextRaw.value;
  let searchText = searchText1.replace(/\s/g, "").toLowerCase();

  Array.from(getReceipes()).forEach(function (recipe) {
    if (searchText.length === 0) {
      recipe.style.display = "block";
    } else {
      var nameElement = recipe.getElementsByTagName("h5")[0];

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

export { searchInput };
