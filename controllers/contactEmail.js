const path = require('path');
// const functions = require('firebase-functions');
const cors = require('cors')({
    origin: true,
});
// to held generate sitemap






// const fetch = require('node-fetch');

// var path = require("path");
// The Firebase Admin SDK to access the Firebase Realtime Database.
// const admin = require('firebase-admin');
// admin.initializeApp(functions.config().firebase);
var aws = require('aws-sdk');

// path.join(__dirname, '..', 'files')

// aws.config.loadFromPath(path.dirname('aws-config.json'));
aws.config.loadFromPath(path.join(__dirname, '..', 'aws-config.json'));

// aws.config.loadFromPath('/home/david/Desktop/websites2/brisbane-flamenco-ssr/functions/aws-config.json');


// Provide the full path to your config.json file.
// aws.config.loadFromPath(path.dirname('./config.json'));
// aws.config.loadFromPath('../../aws-config.json');

// Replace sender@example.com with your "From" address.
// This address must be verified with Amazon SES.
const sender = "David <dheis24@gmail.com>";

// Replace recipient@example.com with a "To" address. If your account
// is still in the sandbox, this address must be verified.
const recipient = "davidheis@hotmail.com";

// Specify a configuration set. If you do not want to use a configuration
// set, comment the following variable, and the
// ConfigurationSetName : configuration_set argument below.
// const configuration_set = "ConfigSet";

// The character encoding for the email.
const charset = "UTF-8";

// Create a new SES object.
var ses = new aws.SES();

exports.sendEmailForm = (req, res, next) => {

    // The subject line for the email.
    const subject = "Contact page from mybrisbanewebsite";

    const body_text = `
      Email: ${req.body.email}
      First Name: ${req.body.fname}
      Last Name: ${req.body.lname}
      Subject: ${req.body.subject}
      Message: ${req.body.message}
      -- email from mybrisbanewebsite.com.au`;

    const body_html = `<html>
    <head></head>
    <body>
    
      <p>
      Email: ${req.body.email}<br>
      Name: ${req.body.fname}<br>
      Last Name: ${req.body.lname}<br>
      Subject: ${req.body.subject}<br>
      Message: ${req.body.message}<br>
      -- email from mybrisbanewebsite.com.au </p>
    </body>
    </html>`;

    var params = {
        Source: sender,
        Destination: {
            ToAddresses: [recipient]
        },
        Message: {
            Subject: {
                Data: subject,
                Charset: charset
            },
            Body: {
                Text: {
                    Data: body_text,
                    Charset: charset
                },
                Html: {
                    Data: body_html,
                    Charset: charset
                }
            }
        }
        // ConfigurationSetName: configuration_set
    };
    // cors allows origin access, prevents no access errors
    cors(req, res, () => {
        //Try to send the email.
        ses.sendEmail(params, (err, data) => {
            // If something goes wrong, print an error message.
            if (err) {
                console.log(err.message);
                res.status(400).send(err.message);
            } else {
                console.log("Email sent! Message ID: ", data.MessageId);
                res.status(200).end();
            }
        });
    })

    next();
};