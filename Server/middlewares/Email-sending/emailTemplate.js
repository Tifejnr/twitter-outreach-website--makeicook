const nodemailer = require("nodemailer");
const { getKeys } = require("../../envKeys/allKeys");
const keysObject = getKeys();

const hbs = require("nodemailer-express-handlebars");

async function sendEmail(customerParams, emailContextParams) {
  try {
    const emailUsername = keysObject.emailUsername;
    const emailPassword = keysObject.emailPassword;
    const subject = customerParams.subject;
    const folderDir = customerParams.folderDir;
    const customerEmail = customerParams.customerEmail;

    // Create a transporter object using the default SMTP transport
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: emailUsername,
        pass: emailPassword,
      },
    });

    // Configure Handlebars for email templates
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

    // Send mail with defined transport object
    const mailOptions = {
      from: emailUsername,
      to: customerEmail,
      subject: subject,
      template: "email",
      context: emailContextParams,
    };

    // Use async/await to send the email and capture the result
    const info = await transporter.sendMail(mailOptions);

    // Return the email sending result
    return { info };
  } catch (error) {
    // If there is an error, return the error information
    return { error };
  }
}

exports.sendEmail = sendEmail;
