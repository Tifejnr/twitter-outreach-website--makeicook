const describeClientPainPoints = `
describe all the client pain points from this job description.
`;

const reduceTo250xters = `Reduce this cover letter opening to 250 characters without losing its structure 

Only return the reduced cover letter opening. don't quote your response, don't explain anything, don't prefix the main cover letter with any explanantion or any revision.
`;

const irresistiabiltyRangeCheck = `
This is the opening line that the client will first read once he sights my cover letter.

On a scale of 0-10, how irrestible is this for a client who needs to hire someone ?
`;

const craftIrresistibleCoverLetterLastPart = `Following that, craft a 10/10 irrestitble cover letter opening for me.

Acknowledge the client's pain point in the beginning to get their attention.

Do not say you are excited or thrilled to apply to their job, be professional.

Keep your crafted cover letter opening within 250 characters.

Only return the cover letter opening you crafted. don't explain anything, don't prefix the main cover letter with any explanantion or any revision.
      `;

const promptsObjsForCoverLetterOptimization = {
  craftIrresistibleCoverLetterLastPart,
  irresistiabiltyRangeCheck,
  reduceTo250xters,
  describeClientPainPoints,
};

export default promptsObjsForCoverLetterOptimization;
