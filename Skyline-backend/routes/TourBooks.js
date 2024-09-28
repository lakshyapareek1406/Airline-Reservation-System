const express = require('express');
const router = express.Router();
let TourBook = require('../models/TourBooking');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');

//Add Tours
router.post('/add', async (req, res) => {
    try {
        const {
      userId,tourId,from,to,tripType,flight,title, firstName, lastName, dateOfBirth, country, address, passportNo,email,
       phone,Additionalpassengers,passengers, departureDate, returnDate, classtype,totalPrice,status,payment_status,
           
        } = req.body;

        const newbook = new TourBook({ 
          userId,tourId,from,to,tripType,flight,title, firstName, lastName, dateOfBirth, country, address, passportNo,email,
          phone,Additionalpassengers,passengers, departureDate, returnDate, classtype,totalPrice,status,payment_status,
        
        });
       
        await newbook.save();
        await sendApprovalEmail(email,firstName,departureDate,to,from);
        res.json({ message: "Booking  Successful" }); 
    } catch (err) {
        console.error(err);
        res.status(500).send("Error Booking ");
    }
});




//Get all Flights

router.route("/").get((req, res) => {

    TourBook.find().then((tour) => {
        res.json(tour)
    }).catch((err) => {

          console.log(err);
          res.status(500).send('Error fetching tour: ' + err.message);
    })


})




//delete

router.route("/delete/:id").delete(async (req, res) => {
    let BookId = req.params.id;

    await TourBook.findByIdAndDelete(BookId)
    .then(() => {
        res.status(200).send({status:" Book Deleted" });
    }).catch(err => {
        console.error(err);
        res.status(500).send({status:" Error with delete Book",error: err.message});
    })
 

})   





// Get Single Booking by ID

router.route("/get/:id").get(async (req, res) => {
    const id = req.params.id;
  
    try {
      const book = await TourBook.findById(id);
      if (!book) {
        return res.status(404).json({
          success: false,
          message: "book not found",
        });
      }
  
     // console.log("Fetched Tour:", Tour);
  
      res.status(200).json({
        success: true,
        message: "Book found",
        data: book,
      });
    } catch (error) {
      console.error("Error fetching Book:", error);
      res.status(500).json({
        success: false,
        message: "Failed to fetch Book",
      });
    }
  });



// Nodemailer configuration
const transporter = nodemailer.createTransport({
  service: 'Gmail',
  auth: {
    user: 'skylinecompany42@gmail.com',
    pass: 'krbz qlpb ctfr eukn'
  }
});

// Function to send email
const sendApprovalEmails = (email, status,firstName,departureDate,from,to,returnDate,flight,totalPrice) => {
  if (!email) {
    throw new Error('No recipient email defined');
  }

  let subject;
  let text;

  // Set subject and text based on status
  switch (status) {
    case 'Confirmed':
      subject = 'Booking Confirmation';
      text = `Your Skyline Tour booking is ${status}!
      
      Dear ${firstName},

      We are pleased to confirm your reservation for the Skyline Tour on ${departureDate}. Your payment has been successfully processed.
      
      
      Booking Details:

      From: ${from}
      To: ${to}
      Departure Date: ${departureDate}
      Return Date: ${returnDate}
      Flight : ${flight}

      Payment details:

      Amount Paid: $ ${totalPrice}
      Payment Method: Visa, MasterCard, American Express

      Make the payment as soon as possible. Contact us if you have any questions or need further assistance.

      Thanks so much for joining us!

      Best regards,
         Skyline
      
      `;
      break;
    case 'Cancelled':
      subject = 'Booking Cancellation';
      text = ` Cancellation Confirmation: Booking Skyline Tours

          Dear ${firstName},
      
      We regret to inform you that your reservation for the Skyline Tour on ${departureDate} has been cancelled.
      
      We apologize for any inconvenience this may cause. If you have any further questions or need assistance, please do not hesitate to contact us.
      
      Thank you for considering our services.
      
      best regards,
      
      Skyline
     ';`


      break;
    case 'Finished':
      subject = 'Booking Completion';
      text = `Your reservation has been successfully completed

      Dear ${firstName},
      
      As your payment has been received, we are pleased to confirm that you have successfully booked the Skyline tour from ${from} to ${to} on ${departureDate}.
      
      
      Thank you for choosing to embark on this adventure with us! If you have any questions or need further assistance, feel free to contact us at any time.
      
      best regards,
        Skyline
      
     `
      break;
    default:
      throw new Error('Invalid status');
  }

  const mailOptions = {
    from: 'skylinecompany42@gmail.com',
    to: email,
    subject: subject,
    text: text
  };

  return new Promise((resolve, reject) => {
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        return reject(error);
      }
      resolve(info);
    });
  });
};




// Update booking endpoint
router.route("/update/:id").put(async (req, res) => {
  let BookingId = req.params.id;
  const {
    userId,
            tourId,
            from,
            to,
            tripType,
            flight,
            title,
            firstName,
            lastName,
            dateOfBirth,
            country,
            address,
            passportNo,
            
            phone,
            Additionalpassengers,
            passengers,
            departureDate,
            returnDate,
            classtype,
            totalPrice,
    email,
    status,
    payment_status,
  } = req.body;

  const updateBooking = {
    userId,
            tourId,
            from,
            to,
            tripType,
            flight,
            title,
            firstName,
            lastName,
            dateOfBirth,
            country,
            address,
            passportNo,
            
            phone,
            Additionalpassengers,
            passengers,
            departureDate,
            returnDate,
            classtype,
            totalPrice,
    email,
    status,
    payment_status,
  };

  try {
    await TourBook.findByIdAndUpdate(BookingId, updateBooking);
    await sendApprovalEmails(email, status,firstName,departureDate,from,to,returnDate,flight,totalPrice);
    res.status(200).send({ status: "Booking Status Updated and Email Sent" });
  } catch (err) {
    console.error(err);
    res.status(500).send({ status: "Error with updating status", error: err.message });
  }
});






// get users booking
router.route("/users/:id").get(async (req, res) => {

  const userid = req.params.id;
  try {
    const booking = await TourBook.find({
      userId: userid,
    });
    res.status(200).json({
      success: true,

      message: "Successfull",
      data: booking,
    });
  } catch (error) {
    res.status(404).json({
      success: true,
      message: "Not found",
    });
  }
});

module.exports = router;






























  /*

//update Status
router.route("/update/:id").put(async (req, res) => {
   let BookingId = req.params.id;
   const{
    email,
    status,
    payment_status,

   } = req.body;

   const updateBooking = {
  
    email,
            status,
            payment_status,
   }
  // await sendApprovalEmails(email,status);

   const update = await TourBook.findByIdAndUpdate(BookingId,updateBooking)
    .then(() => {
        res.status(200).send({status:" Booking Status" })
    }).catch(err => {
     console.error(err);
     res.status(500).send({status:" Error with updating Status",error: err.message});
    })
 


})*/

/*
 // Function to send approval Booking
 async function sendApprovalEmails(email, status) {
  try {
    // Create a transporter object using SMTP transport
    let transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 465,
      secure: true, // false for other ports
      auth: {
        user: 'skylinecompany42@gmail.com', // your email
        pass: 'krbz qlpb ctfr eukn ' // your password
      }
    });

    // send mail with defined transport object and capture the result
    let info = await transporter.sendMail({
      from: 'skylinecompany42@gmail.com', // sender address
      to: email, // list of receivers
      subject: 'Skyline Tour Booking Successful!', // Subject line
      text: `Congratulations! Your booking with Skyline has been approved. 
      
      Email: ${email}
      Status: ${status}
    `
    });

    console.log('Message sent: %s', info.messageId);
  } catch (error) {
    console.error('Error sending approval email:', error);
  }
}

*/













 // Function to send Booking success email
 async function sendApprovalEmail(email,firstName,departureDate,to,from) {
    try {
      // Create a transporter object using SMTP transport
      let transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 465,
        secure: true, // false for other ports
        auth: {
          user: 'skylinecompany42@gmail.com', // your email
          pass: 'krbz qlpb ctfr eukn ' // your password
        }
      });
  
      // send mail with defined transport object and capture the result
      let info = await transporter.sendMail({
        from: 'skylinecompany42@gmail.com', // sender address
        to: email, // list of receivers
        subject: ' Skyline Tour Booking Successful!', // Subject line
        text: `Dear ${firstName},

        Thank you for booking the Skyline Tour  From ${from}  to ${to} on the ${departureDate}. 
        Your reservation has been successfully received and is now being processed.
        
        We will send you a confirmation email shortly. If you have any questions, please contact us.
        

        Best regards,
        Skyline`
        
        
      });
  
      console.log('Message sent: %s', info.messageId);
    } catch (error) {
      console.error('Error sending approval email:', error);
    }
  }

  router.route("/search/waitingBookings").get(async (req, res) => {
    try {
      const WaitingBookingCount = await TourBook.countDocuments({
        status: "Waiting",
      });
  
      res.status(200).json({
        success: true,
  
        data: WaitingBookingCount,
      });
    } catch (error) {
      res.status(500).json({
        success: true,
        message: "Not found",
      });
    }
  });





  
  // getTotal Booking
  router.route("/search/getbookingprice").get(async (req, res) =>{

    try {
      const totalPrice = await TourBook.countDocuments({
    
      });
      res.status(200).json({
        success: true,
  
        data: totalPrice,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "not found",
      });
    }
  });


  // getTotalPrice
router.route("/search/gettotalprice").get(async (req, res) => {
  try {
    const bookings = await TourBook.find({}, { totalPrice: 1 }); // Retrieve only totalPrice field
    let totalPrice = 0;

    // Sum up the totalPrice of all bookings
    bookings.forEach(booking => {
      totalPrice += booking.totalPrice;
    });

    res.status(200).json({
      success: true,
      data: totalPrice,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error calculating total price",
      error: error.message,
    });
  }
});


// Get round tour count
router.route("/search/roundTourCount").get(async (req, res) => {
  try {
      const roundTourCount = await TourBook.countDocuments({
        tripType: "Round-Tour",
      });
      res.status(200).json({
          success: true,
          data: roundTourCount,
      });
  } catch (error) {
      res.status(500).json({
          success: false,
          message: "not found",
      });
  }
});



  // Get One way tour count
  router.route("/search/OneWayTourCount").get(async (req, res) => {
    try {
        const OneWayTourCount = await TourBook.countDocuments({
          tripType: "One-Way",
        });
        res.status(200).json({
            success: true,
            data: OneWayTourCount,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "not found",
        });
    }
  });




// getTotalPrice for economy class
router.route("/search/geteconomytotalprice").get(async (req, res) => {
  try {
    const bookings = await TourBook.find({ classtype: "economy" }, { totalPrice: 1 }); // Retrieve only totalPrice field where classtype is economy
    let totalPrice = 0;

    // Sum up the totalPrice of all bookings
    bookings.forEach(booking => {
      totalPrice += booking.totalPrice;
    });

    res.status(200).json({
      success: true,
      data: totalPrice,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error calculating total price",
      error: error.message,
    });
  }
});

// getTotalPrice for business class
router.route("/search/getbusinesstotalprice").get(async (req, res) => {
  try {
    const bookings = await TourBook.find({ classtype: "business" }, { totalPrice: 1 }); // Retrieve only totalPrice field where classtype is economy
    let totalPrice = 0;

    // Sum up the totalPrice of all bookings
    bookings.forEach(booking => {
      totalPrice += booking.totalPrice;
    });

    res.status(200).json({
      success: true,
      data: totalPrice,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error calculating total price",
      error: error.message,
    });
  }
});






// get single booking
router.route("/:id").get(async (req, res) => {

  const id = req.params.id;
  try {
    const booking = await TourBook.findById(id);
    res.status(200).json({
      success: true,

      message: "Successfull",
      data: booking,
    });
  } catch (error) {
    res.status(404).json({
      success: true,
      message: "Not found",
    });
  }
});
  






//payment status update

router.route("/update/payment/:id").put(async (req, res) => {
  let BookingId = req.params.id;
  const {
    userId,
            tourId,
            from,
            to,
            tripType,
            flight,
            title,
            firstName,
            lastName,
            dateOfBirth,
            country,
            address,
            passportNo,
            
            phone,
            Additionalpassengers,
            passengers,
            departureDate,
            returnDate,
            classtype,
            totalPrice,
    email,
    status,
    payment_status,
  } = req.body;

  const updateBooking = {
    userId,
            tourId,
            from,
            to,
            tripType,
            flight,
            title,
            firstName,
            lastName,
            dateOfBirth,
            country,
            address,
            passportNo,
            
            phone,
            Additionalpassengers,
            passengers,
            departureDate,
            returnDate,
            classtype,
            totalPrice,
    email,
    status,
    payment_status,
  };

  try {
    await TourBook.findByIdAndUpdate(BookingId, updateBooking);
  //  await  sendApprovalEmailss(email, firstName, totalPrice, departureDate);
    res.status(200).send({ status: "Booking Status Updated and Email Sent" });
  } catch (err) {
    console.error(err);
    res.status(500).send({ status: "Error with updating status", error: err.message });
  }
});




/*

// Function to send Booking success email
async function sendApprovalEmailss(email,firstName,totalPrice,departureDate) {
  try {
    // Create a transporter object using SMTP transport
    let transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 465,
      secure: true, // false for other ports
      auth: {
        user: 'skylinecompany42@gmail.com', // your email
        pass: 'krbz qlpb ctfr eukn ' // your password
      }
    });

    // send mail with defined transport object and capture the result
    let info = await transporter.sendMail({
      from: 'skylinecompany42@gmail.com', // sender address
      to: email, // list of receivers
      subject: ' Your Payment  Successful!', // Subject line
      text: `Dear ${firstName},

      
      We are thrilled to inform you that your payment for the Skyline Tour reservation on ${departureDate} has been successfully processed.
      
      Payment Details:
      
      Amount Paid: $${totalPrice}
      
      
      Your reservation is now confirmed, and we look forward to welcoming you on board for an incredible journey.
      
      If you have any questions or need further assistance, feel free to contact us at any time.
      
      Thank you for choosing Skyline for your travel plans!
      
      Best regards,
      Skyline`
      
      
    });

    console.log('Message sent: %s', info.messageId);
  } catch (error) {
    console.error('Error sending approval email:', error);
  }
}*/

module.exports = router;