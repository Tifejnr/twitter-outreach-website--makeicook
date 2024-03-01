import nodemailer from "nodemailer";
import hbs from "nodemailer-express-handlebars";
import getSecretKeys from "../../envVariables/envVariables.js";

export default async function sendEmail(customerParams, emailContextParams) {
  const keysObject = getSecretKeys();
  const { emailUsername, emailPassword } = keysObject;

  const { subject, folderDir, customerEmail } = customerParams;

  // create reusable transporter object using the default SMTP transport
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: emailUsername,
      pass: emailPassword,
    },
  });

  const handlebarOptions = {
    viewEngine: {
      extname: ".hbs",

      layoutsDir: `${folderDir}`,

      defaultLayout: "email",

      partialsDir: `${folderDir}/partials/`,
    },

    viewPath: `${folderDir}`,

    extName: ".hbs",
  };

  transporter.use("compile", hbs(handlebarOptions));

  // send mail with defined transport object
  const mailOptions = {
    from: emailUsername,
    to: customerEmail,
    subject: subject,
    template: "email",

    context: emailContextParams,
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log("Email sent: " + info.response);
    console.log("Email sent");
    return true;
  } catch (error) {
    console.log(error);
    console.log("Error: Email not sent");
    return false;
  }
}
