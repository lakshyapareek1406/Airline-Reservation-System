const express = require('express');
const router = express.Router();
let FeedbackReply = require('../models/FeedbackReply')
const nodemailer = require('nodemailer');

//add
router.post('/add', async (req, res) => {
    try {
        const {
            userId,
            feedbackId,
            email,
            name,
            subject,
            message,
            feedbackReply
            
        } = req.body;

        const newFeedbackReply = new FeedbackReply({ 
            userId,
            feedbackId,
            email,
            name,
            subject,
            message,
            feedbackReply
        });

        await newFeedbackReply.save();
        await sendApprovalEmail(email,name,feedbackReply,message);
        res.json({ message: "FeedbackReply Add Successful" }); 
    } catch (err) {
        console.error(err);
        res.status(500).send("Error FeedbackReply Add");
    }
});



 // Function to send Booking success email
 async function sendApprovalEmail(email,name,feedbackReply,message) {
    try {
      // Create a transporter object using SMTP transport
      let transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 465,
        secure: true,
        auth: {
          user: 'skylinecompany42@gmail.com', // your email
          pass: 'krbz qlpb ctfr eukn ' // your password
        }
      });
  
      // send mail with defined transport object and capture the result
      let info = await transporter.sendMail({
        from: 'skylinecompany42@gmail.com', // sender address
        to: email, // list of receivers
        subject: ' Feedback reply!', // Subject line
        text: `

        Dear ${name},
        
        Thank you for reaching out for help. Your message has been received and the reply is given below
        
        
             Question: ${message}
        
              Answer: ${feedbackReply}
        
        
         Here is an answer to your problem, if your problem is not solved then contact us again
        
                          Thank you so much for joining us!
                    We appreciate your patience and understanding.
        
        best regards,
          Skyline`
        
        
      });
  
      console.log('Message sent: %s', info.messageId);
    } catch (error) {
      console.error('Error sending approval email:', error);
    }
  }


















module.exports = router;