const express = require('express');
const nodemailer = require("nodemailer");

const { signup, login} = require('../controllers/auth.js');
const router = express.Router();

const contactEmail  = nodemailer.createTransport({
    service: 'gmail',
    auth: {
    user: "thestudentconnectuwe@gmail.com",
    pass: "********",
    },
});

contactEmail .verify((error) => {
    if (error) {
    console.log(error);
    } else {
    console.log("Ready to Send");
    }
});

router.post('/contact', (req, res) => {
    const name = req.body.name;
    const email = req.body.email;
    const message = req.body.message; 
    console.log(name);
    console.log(email);
    console.log(message);
    console.log("Hello ")
    const mail = {
      from: name,
      to: "thestudentconnectuwe@gmail.com",
      subject: "Contact Form Submission",
      html: `<p>Name: ${name}</p>
             <p>Email: ${email}</p>
             <p>Message: ${message}</p>`,
    };
    contactEmail.sendMail(mail, (error) => {
      if (error) {
        res.json({ status: "ERROR" });
      } else {
        res.json({ status: "Message Sent" });
      }
    });
  });

router.post('/signup', signup);
router.post('/login', login);

module.exports = router;