const nodemailer = require("nodemailer");
const { getKeys } = require("../../envKeys/allKeys");
const keysObject = getKeys();

const hbs = require("nodemailer-express-handlebars");

async function sendEmail(customerParams, emailContextParams) {
  const emailUsername = keysObject.emailUsername;
  const emailPassword = keysObject.emailPassword;

  const subject = customerParams.subject;
  const folderDir = customerParams.folderDir;
  const customerEmail = customerParams.customerEmail;
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
    from: "workforreputation@gmail.com",
    to: customerEmail,
    subject: subject,
    template: "email",

    context: emailContextParams,
  };

  const result = await transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error);
      console.log("Error: Email not sent");
    } else {
      console.log("Email sent: " + info.response);
      console.log("Email sent");
    }
  });

  console.log(result);

  if (result) return true;
}

exports.sendEmail = sendEmail;
