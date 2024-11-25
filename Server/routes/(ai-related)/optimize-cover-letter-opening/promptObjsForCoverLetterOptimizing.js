const describeClientPainPoints = `
From this job description to me as a freelancer who wants to apply to this job.

Return client pain point that you feel will most likely grab the client's attention the most if adressed.

Only return the response straight forward. don't prefix your response with any brief.
`;

const reduceTo250xters = `Reduce this cover letter opening line to 260 characters without losing its structure. 

Make it human readable and understandable. 

Only return the reduced cover letter opening. don't explain anything, don't prefix the main cover letter with any explanantion or any revision.
`;

const irresistiabiltyRangeCheck = `
This is the opening line that the client will first read once he sights my cover letter.

On a scale of 0-10, how irrestible is this for a client who needs to hire someone ?
`;

const craftIrresistibleCoverLetterLastPart = `Using this pain point to grab the client attention, craft a 10/10 irrestitble cover letter opening for me.


a "You focus" approach must start with "You need", followed by client pain point need.

Use a "You focus" approach to restate the client pain point to prove you understand exactly what the client wants.

Keep your crafted cover letter opening within 250 characters.

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
