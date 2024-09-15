const promptToActForClientSummary = `
The text below is what frelancers said about a client.

In a sentence, summarise how working with the client is:

Start your response with : "Here is a summary of how freelancers described working with the client:"

`;

const feedbackReviewsToClients = `
Awesome client to work with!
Thanks Troy for your help and support..always loves to work with you! thanks
Pleasure working with Troy. He is very passionate about his business and was able to provide some guidance for his SEO and design team.
Troy is an awesome client, and this contract did not end because of any conflict between us. He will be clear with what he wants. Awesome work
Thank You very much.
Troy was a great client. Clear deliverable and he was available for questions or clarifications as needed.
Clear instructions and expectations, great attitude and a pleasure to work with. Highly recommended.
Great client.
The client seems to have trust issues. This is something that we all should be aware about, in these times of pandemic, we can't afford to be in a neg
pretty good client....... not quite attuned on the vial steps 1 to 10 get the job dined in a fine professional and cost effective expedited manner
`;
const clientPersonalityPromptsObj = {
  feedbackReviewsToClients,
  promptToActForClientSummary,
};

export default clientPersonalityPromptsObj;
