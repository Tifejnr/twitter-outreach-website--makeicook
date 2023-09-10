import axios from "axios";
import { websiteUrl } from "../../JS functions/websiteUrl";
import getCookies from "../utilis/cookiesSetting/getCookies";

export default async function getWorkspacesName(workspaceId) {
  try {
    const token = getCookies();
    if (!token) return { error: "No token" };
    const paramToServer = { workspaceId, token };

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
