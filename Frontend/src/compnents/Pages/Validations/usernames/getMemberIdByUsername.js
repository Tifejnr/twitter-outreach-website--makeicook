import axios from "axios";
import { websiteUrl } from "../../../../JS functions/websiteUrl";

export default async function getMemberIdByUsername(memberDetailsForIdGetting) {
  const getMemberIdUrl = `${websiteUrl}/find-member-id`;

  try {
    const response = await axios.post(
      getMemberIdUrl,
      memberDetailsForIdGetting
    );

    if (!response) return console.log("no response");

    return response.data;
  } catch (error) {
    console.error("Error:", error);

    return { error };
  }
}
