const axios = require("axios");

async function getWorkspaceName(req, res) {
  const { workspaceId } = req.body;

  const workspaceNameGettingUrl = `https://api.trello.com/1/organizations/${workspaceId}?&key=${key}&token=${token}`;

  try {
    const response = await axios.get(workspaceNameGettingUrl);
    console.log(response);
    if (response.status === 200) {
      console.log("Workspace  Name gotten");
      const workspaceName = response.data.displayName;
      return res.status(200).json({ workspaceName });
    }
  } catch (error) {
    console.error("Error:", error);
    console.error(error.message);

    res.status(400).json({ error });
  }
}

exports.getWorkspaceName = getWorkspaceName;
