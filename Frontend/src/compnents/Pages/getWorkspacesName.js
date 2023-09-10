import axios from "axios";
import { websiteUrl } from "../../JS functions/websiteUrl";

export default async function getWorkspacesName(workspaceId) {
  try {
    const paramToServer = { workspaceId };

    const fetchWorkspaceNameUrl = `${websiteUrl}/get-workspace-name`;
    const response = await axios.post(fetchWorkspaceNameUrl, paramToServer);

    const workspaceName = response.data.workspaceName;
    if (workspaceName) return workspaceName;
  } catch (error) {
    //handle any error from server or internet
    console.log(error);
    const errorMessage = error.response.data;
    //Unauthorized handling
  }
}
