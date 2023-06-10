async function deleteMemberFromBoard(req, res) {
  const { boardId, email } = req.body;
  const response = await fetch(
    `https://api.trello.com/1/boards/${boardId}/members?&key=${apiKey}&token=${apiToken}`,
    {
      method: "GET",
    }
  );

  const data = await response.json();
}
