export default function boardIdAndName(paramsForboardIdAndName) {
  const checkboxesArray = paramsForboardIdAndName.checkboxesArray;
  const boardsCollection = paramsForboardIdAndName.boardsCollection;

  const boardDetailsObj = checkboxesArray.map((checkbox, index) => {
    if (!checkbox.checked) return false;

    const checkboxId = checkbox.id;

    const arrayNoFromId = Number(checkboxId.replace(/\D/g, ""));

    const boardEl = document.getElementById(`labelcheck${arrayNoFromId}`);

    const boardName = boardEl.textContent;

    const foundBoard = findBoardIdByName(boardsCollection, boardName);

    if (!foundBoard) return console.log("board not found");
    const boardId = foundBoard.id;

    const neededObj = {
      boardId,
      boardName,
    };

    return neededObj;
  });

  if (!boardDetailsObj) return "";

  return boardDetailsObj;
}
