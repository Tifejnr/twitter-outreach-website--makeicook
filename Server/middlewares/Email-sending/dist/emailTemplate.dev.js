"use strict";

var nodemailer = require("nodemailer");

var _require = require("../../envKeys/allKeys"),
    getKeys = _require.getKeys;

var keysObject = getKeys();

var hbs = require("nodemailer-express-handlebars");

function sendEmail(customerParams, emailContextParams) {
  var emailUsername, emailPassword, subject, folderDir, customerEmail, transporter, handlebarOptions, mailOptions, info;
  return regeneratorRuntime.async(function sendEmail$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          emailUsername = keysObject.emailUsername;
          emailPassword = keysObject.emailPassword;
          subject = customerParams.subject;
          folderDir = customerParams.folderDir;
          customerEmail = customerParams.customerEmail; // Create a transporter object using the default SMTP transport

          transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
              user: emailUsername,
              pass: emailPassword
            }
          }); // Configure Handlebars for email templates

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
          transporter.use("compile", hbs(handlebarOptions)); // Send mail with defined transport object

          mailOptions = {
            from: emailUsername,
            to: customerEmail,
            subject: subject,
            template: "email",
            context: emailContextParams
          }; // Use async/await to send the email and capture the result

          _context.next = 12;
          return regeneratorRuntime.awrap(transporter.sendMail(mailOptions));

        case 12:
          info = _context.sent;
          return _context.abrupt("return", {
            info: info
          });

        case 16:
          _context.prev = 16;
          _context.t0 = _context["catch"](0);
          return _context.abrupt("return", {
            error: _context.t0
          });

        case 19:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[0, 16]]);
}

exports.sendEmail = sendEmail;