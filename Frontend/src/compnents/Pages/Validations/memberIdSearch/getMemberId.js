import axios from "axios";
import { websiteUrl } from "../../../../JS functions/websiteUrl";

export default async function getMemberId(allBoardsId) {
  const getMemberIdUrl = `${websiteUrl}/find-member-id`;

  try {
    const response = await axios.post(getMemberIdUrl, { allBoardsId });

    if (!response) return console.log("no response");

    return response.data;
  } catch (error) {
    console.error("Error now:", error);

    return { error };
  }
}
