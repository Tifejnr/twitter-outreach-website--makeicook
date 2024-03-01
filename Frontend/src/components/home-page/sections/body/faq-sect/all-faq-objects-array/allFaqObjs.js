export type FaqObjType = {
  question: string;
  answer: string;
  toolsTutorial?: boolean;
  contactUsLink?: boolean;
  inviteWhen?: boolean;
  dontKnowWhatToSubmit?: boolean;
  noFeedbackAfterEndContract?: boolean;
  seeingFeedback?: boolean;
};

const faqArray = [
  {
    question: "When will I get my Invite?",
    answer:
      "Within 6 hours of making request on niches you want jobs on. Click",
    inviteWhen: true,
  },

  {
    question: `Received the Invite notification, but can't find the invite once i logged in to reply.`,
    answer: "Refresh your notifications tab. You should see the invite there.",
  },
  {
    question: `Can't see any invite after it was claimed to have been sent.`,
    answer: `This might be due to occasional glitches on the platform. Request that the invite be resent if not seen within 6 hours after which it was claimed to have been sent.`,
  },

  {
    question: "Client is unresponsive",
    answer: ` Client is "unresponsive" if he doesn't reply after 4-5 hours. Report the client name in the group to hasten their response.`,
  },

  {
    question: "Can I submit anything?",
    answer: `NO! You must submit work related to the given task to get your payments. If you have no clue on what to submit, check FAQ no 6.`,
  },

  {
    question: `Don't know what to Submit?`,
    answer: `Navigate to the make request section by clicking:`,
    dontKnowWhatToSubmit: true,
  },

  {
    question:
      "Amount earned is displaying 0 despite just getting paid for a completed job ?",
    answer: `Your funds will become available on your account after 5 days security period.`,
  },

  {
    question: `Client didn't give me feedback after he ended the contract?`,
    answer: `Click on the contract already ended by the client, you will be redirected to a page where you can give feedback to the client.
    Give the client feedback.`,

    noFeedbackAfterEndContract: true,
  },

  {
    question: "Client didn't give me feedback after I gave him feedback?",
    answer: `Click on the contract already ended by the client, you will be redirected to contract overview page. 
    On the overview page, click on details, scroll down till you see "Client's Feedback to You".`,
    seeingFeedback: true,
  },
];

export default faqArray;
