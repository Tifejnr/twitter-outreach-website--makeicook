import axios from "axios";
import { websiteUrl } from "../../../../JS functions/websiteUrl";
import getCookies from "../../../utilis/cookiesSetting/getCookies";

export default async function getMemberId(allBoardsId) {
  const getMemberIdUrl = `${websiteUrl}/find-member-id`;
  const token = getCookies();

  try {
    const response = await axios.post(getMemberIdUrl, { allBoardsId, token });

    if (!response) return console.log("no response");

    return response.data;
  } catch (error) {
    console.error("Error now:", error);

    return { error };
  }
}
