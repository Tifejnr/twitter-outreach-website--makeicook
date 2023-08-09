import axios from "axios";
import { websiteUrl } from "../../../../JS functions/websiteUrl";

export default async function getMemberIdByUsername(boardId, memberUsername) {
  const getMemberIdUrl = `${websiteUrl}/get-member-id`;

  const paramToServer = {
    memberUsername,
    boardId,
  };

  try {
    const response = await axios.post(getMemberIdUrl, paramToServer);
    console.log(response);
  } catch (error) {
    console.error("Error:", error);
  }
}
