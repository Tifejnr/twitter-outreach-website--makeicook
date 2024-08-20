import user from "../../../server-utils/database/usersDb.js";
import emailTemplateFolderSrc from "../../../server-utils/emailTemplates/template-folder-src/emailTemplateFolderSrc.js";
import sendEmail from "../../../server-utils/emailTemplates/sendEmail.js";
import getFirstName from "./getFirstname.js";

async function sendMailToMultipleUsers() {
  const allUsers = await user.find();

  const allUsersThatHaveUsedExtensionOnce = allUsers.filter(
    (user) => user.jobsToBeCompleted > 0
  );

  if (allUsersThatHaveUsedExtensionOnce.length < 1)
    return console.log("no user found");

  // const indexOfLastMessaged = allUsersThatHaveUsedExtensionOnce.findIndex(
  //   (user) => user.email === "Lawrencejoy548@gmail.com"
  // );

  // console.log("indexOfLastMessaged ", indexOfLastMessaged);

  // const startIndex = 179;
  // const slicedArray = allUsersThatHaveUsedExtensionOnce.slice(startIndex);

  runWithDelay(allUsersThatHaveUsedExtensionOnce, sendMailFunction);
}

async function sendMailFunction(user) {
  const { email, name } = user;
  const firstNameNow = getFirstName(name);

  const message = `Are you able to see retrieved client names on the proposal submission page when trying to submit proposals on Upwork?`;

  try {
    const subject = `${firstNameNow}, is the WFR Toolkit extension working as it used to work on your end?`;
    const folderDir = `${emailTemplateFolderSrc}/email-to-multiple/to-client`;

    const customerParams = {
      subject: subject,
      folderDir: folderDir,
      customerEmail: email,
    };

    const emailContextParamsNow = {
      message,
      customerName: firstNameNow,
    };

    const result = await sendEmail(customerParams, emailContextParamsNow);

    if (result) {
      console.log("Email sent to", email);
    }
  } catch (error) {
    console.log("Error:", error);
  }
}

function runWithDelay(array, func) {
  array.reduce((promise, item) => {
    return promise.then(() => {
      return new Promise((resolve) => {
        func(item);
        setTimeout(resolve, 2000); // 2 seconds delay
      });
    });
  }, Promise.resolve());
}

export default sendMailToMultipleUsers;
