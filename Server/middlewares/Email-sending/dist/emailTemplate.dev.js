"use strict";

var nodemailer = require("nodemailer");

var _require = require("../../envKeys/allKeys"),
    getKeys = _require.getKeys;

var keysObject = getKeys();

var hbs = require("nodemailer-express-handlebars");

function sendEmail(customerParams, emailContextParams) {
  var emailUsername, emailPassword, subject, folderDir, customerEmail, transporter, handlebarOptions, mailOptions, result;
  return regeneratorRuntime.async(function sendEmail$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          emailUsername = keysObject.emailUsername;
          emailPassword = keysObject.emailPassword;
          subject = customerParams.subject;
          folderDir = customerParams.folderDir;
          customerEmail = customerParams.customerEmail; // create reusable transporter object using the default SMTP transport

          transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
              user: emailUsername,
              pass: emailPassword
            }
          });
          handlebarOptions = {
            viewEngine: {
              extname: ".hbs",
              layoutsDir: "".concat(folderDir),
              defaultLayout: "email",
              partialsDir: "".concat(folderDir, "/partials/")
            },
            viewPath: "".concat(folderDir),
            extName: ".hbs"
          };
          transporter.use("compile", hbs(handlebarOptions)); // send mail with defined transport object

          mailOptions = {
            from: "workforreputation@gmail.com",
            to: customerEmail,
            subject: subject,
            template: "email",
            context: emailContextParams
          };
          _context.next = 11;
          return regeneratorRuntime.awrap(transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
              console.log(error);
              console.log("Error: Email not sent");
            } else {
              console.log("Email sent: " + info.response);
              console.log("Email sent");
            }
          }));

        case 11:
          result = _context.sent;
          console.log(result);

          if (!result) {
            _context.next = 15;
            break;
          }

          return _context.abrupt("return", true);

        case 15:
        case "end":
          return _context.stop();
      }
    }
  });
}

exports.sendEmail = sendEmail;