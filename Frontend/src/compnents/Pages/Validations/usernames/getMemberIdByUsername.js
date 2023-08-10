import axios from "axios";
import { websiteUrl } from "../../../../JS functions/websiteUrl";

export default async function getMemberIdByUsername(
  memberUsername,
  boardIdsObj
) {
  const getMemberIdUrl = `${websiteUrl}/find-member-id`;
  const paramToServer = {
    memberUsername,
    boardIdsObj,
  };

  try {
    const response = await axios.post(getMemberIdUrl, paramToServer);

    if (!response) return console.log("no response");

    return response.data;
  } catch (error) {
    console.error("Error:", error);

    return { error };
  }
}
