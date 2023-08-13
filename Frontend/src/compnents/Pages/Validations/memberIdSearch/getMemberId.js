import axios from "axios";
import { websiteUrl } from "../../../../JS functions/websiteUrl";

export default async function getMemberId(memberDetailsForIdGetting) {
  console.log(memberDetailsForIdGetting);
  const getMemberIdUrl = `${websiteUrl}/find-member-id`;

  try {
    const response = await axios.post(
      getMemberIdUrl,
      memberDetailsForIdGetting
    );

    if (!response) return console.log("no response");

    return response.data;
  } catch (error) {
    console.error("Error now:", error);

    return { error };
  }
}
