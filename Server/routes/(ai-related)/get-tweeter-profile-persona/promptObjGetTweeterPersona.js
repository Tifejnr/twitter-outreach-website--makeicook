const getUserInterestAndStruggleFromTweets = `
These are personal tweets of a twitter user only.

In 500 words, Tell me what this person's interest is, and what this person might be struggling with.

Only return the response. don't explain anything, don't prefix your response with anything.
`;

const getUserInterestAndStruggleFromRetweets = `
These are tweets endorsed by a twitter user.

In 500 words, Tell me what this person's interest is, and what this person might be struggling with.

Only return the response. don't explain anything, don't prefix your response with anything.
`;

const getUserEgoFromBio = `
This is what a twitter user used to describe themselve on their bio.

In 200 words, Taking their bio only into context, Tell me how this user sees themselves, what is their ego, what is their profession?

Only return the response. don't explain anything, don't prefix your response with anything.
 `;

const promptObjGetTweeterPersona = {
  getUserEgoFromBio,
  getUserInterestAndStruggleFromTweets,
  getUserInterestAndStruggleFromRetweets,
};

export default promptObjGetTweeterPersona;
