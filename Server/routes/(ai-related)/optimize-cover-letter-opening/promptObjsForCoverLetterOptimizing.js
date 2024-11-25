const describeClientPainPoints = `
From this job description to me as a freelancer who wants to apply to this job.

Return client pain point that you feel will most likely grab the client's attention if addressed.

Only return the response straight forward. don't prefix your response with any brief.
`;

const youFocusApproachFormat = `
Hi, you need a storyteller who can unravel intricate concepts and ignite action in your readers to make them buy more of you stories.
`;

const reduceTo250xters = `Reduce this cover letter opening line to 260 characters without losing its structure. 

Make it human readable and understandable. 

Ensure it follow this format : ${youFocusApproachFormat}

Only return the reduced cover letter opening. don't explain anything, don't prefix the main cover letter with any explanantion or any revision.
`;

const irresistiabiltyRangeCheck = `
This is the opening line that the client will first read once he sights my cover letter.

On a scale of 0-10, how irrestible is this for a client who needs to hire someone ?
`;

const craftIrresistibleCoverLetterLastPart = `Using the pain point above to grab the client attention.

a "You focus" approach must start with "You need", followed by demonstrating you understand the client pain point.

Use a "You focus" approach to restate the client pain point to prove you understand exactly what the client wants.

craft a 10/10 irrestitble cover letter opening for me.

Keep your crafted cover letter opening within 250 characters.

Ensure it follow this format : ${youFocusApproachFormat}

Only return the cover letter opening you crafted. don't explain anything, don't prefix the main cover letter with any explanantion or any revision.
`;

// You focus approach

// Asking relevant questions

const promptsObjsForCoverLetterOptimization = {
  craftIrresistibleCoverLetterLastPart,
  irresistiabiltyRangeCheck,
  reduceTo250xters,
  describeClientPainPoints,
};

export default promptsObjsForCoverLetterOptimization;
