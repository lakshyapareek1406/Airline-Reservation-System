const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const ErrorResponse = require("../utils/errorResponse");

const nodemailer = require('nodemailer');
const {roles}=require('../utils/constants');

let register = require('../models/register');
//const  Passenger = require('../models/passenger');

require('dotenv').config();

/*
//middleware for authenticating role
const authenticateRole = (role) => (req, res, next) => {
  // Check if user is authenticated and has the required role
  const token = req.headers['authorization'];
  if (!token) {
    return res.status(401).send('Unauthorized: No token provided');
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(401).send('Unauthorized: Invalid token');
    }

    const userRole = decoded.role;
    if (userRole !== role) {
      return res.status(403).send('Forbidden: Insufficient role');
    }

    next();
  });
};*/



// Route for registering a new user

router.post('/add', async (req, res) => {
  try {
    const { firstName, lastName, dateOfBirth, gender, country, address, passportNo, phone,email,password ,confirmPassword} =
      req.body;

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);
    const hashedConfirmedPassword = await bcrypt.hash(confirmPassword, 10);

    let role = roles.passenger; 
    if (email === "admin@gmail.com") {
      role = roles.admin;
    }

    const newUser = new register({
      firstName,
      lastName,
      dateOfBirth,
      gender,
      country,
      address,
      passportNo,
      phone,
      email,
      password: hashedPassword,
      confirmPassword:hashedConfirmedPassword,
      
      role,
    });

    await newUser.save();
    await sendApprovalEmail(email);

    res.status(200).json({
      success: true,
      message: "Passenger successfully registered",
    });
  } catch (error) {
    console.error("Error registering user:", error);
    res.status(500).json({
      success: false,
      message: "Failed to register Passenger. Please try again later.",
      error: error.message,
    });
  }
});




/*
//Create new Passenger

router.post('/add', async (req, res) => {


    try{
        const {
             firstName,
             lastName,
             dateOfBirth,
             gender,
             country,
             address,
             passportNo,
             phone,
             email,
             password,
             confirmPassword
        } =req.body;

    // Check if email already exists
    const existingUser = await register.findOne({ email: email });
    if (existingUser) {
      return res.status(400).json({ message: 'Email already exists' });
    }

    // Generate salt
    const salt = await bcrypt.genSalt(10);

    // Hash password and confirmPassword
    const hashedPassword = await bcrypt.hash(password, salt);
    const hashedConfirmedPassword = await bcrypt.hash(confirmPassword, salt); 
    
 const newPassenger=new register(
    {
        firstName,
        lastName,
        dateOfBirth,
        gender,
        country,
        address,
        passportNo,
        phone,
        email,
        password:hashedPassword,
        confirmPassword:hashedConfirmedPassword
    }
 ); await newPassenger.save();
   await sendApprovalEmail(email);
// Generate JWT token
const token = jwt.sign({ email: email }, process.env.KEY, { expiresIn: '1h' });



res.cookie('jwt', token, {
  httpOnly: true,
  maxAge: 24 * 60 * 60 * 1000
});

res.json("Registration Successful");
} catch (err) {
console.error(err);
res.status(500).send("Error registering Passenger");
}
});
*/
 


//Get Passenger

router.route("/").get((req, res) => {

    register.find().then((passengers) => {
        res.json(passengers)
    }).catch((err) => {

          console.log(err);
          res.status(500).send('Error fetching users: ' + err.message);
    })


})



//update passenger


router.route("/update/:id").put(async (req, res) => {
   let passengerId = req.params.id;
   const{
    
    firstName,
    lastName,
    dateOfBirth,
    gender,
    country,
    address,
    passportNo,
    phone,
    email,
    password,
    confirmPassword,
    Photo

   } = req.body;

   const updatePassenger = {
    
    firstName,
    lastName,
    dateOfBirth,
    gender,
    country,
    address,
    passportNo,
    phone,
    email,
    password,
    confirmPassword,
    Photo
   }
   const update = await register.findByIdAndUpdate(passengerId,updatePassenger)
    .then(() => {
        res.status(200).send({status:" Passenger Updated" })
    }).catch(err => {
     console.error(err);
     res.status(500).send({status:" Error with updating passenger",error: err.message});
    })
 


})


//Dlete passenger

router.route("/delete/:id").delete(async (req, res) => {
    let passengerId = req.params.id;

    await register.findByIdAndDelete(passengerId)
    .then(() => {
        res.status(200).send({status:" Passenger Deleted" });
    }).catch(err => {
        console.error(err);
        res.status(500).send({status:" Error with delete passenger",error: err.message})
    })
 

})


// get one passenger
/*
router.route("/get/:id").get(async (req, res) =>{
    let passengerId = req.params.id;
  const passenger=  await register.findById(passengerId)
    .then((register) => {
        res.status(200).send({status:" Passenger fetched" ,register})
    }).catch(() => {
        console.log(err.message);
        res.status(500).send({status:" Error with fetching passenger",error: err.message});
    });
})*/



// Get Single User by ID
router.route("/get/:id").get(async (req, res) => {
  const id = req.params.id;

  try {
    const passenger = await register.findById(id);
    if (!passenger) {
      return res.status(404).json({
        success: false,
        message: "passenger not found",
      });
    }

    console.log("Fetched passenger:", passenger);

    res.status(200).json({
      success: true,
      message: "User found",
      data: passenger,
    });
  } catch (error) {
    console.error("Error fetching passenger:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch user",
    });
  }
});



// Route to login a Passenger 

router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    // Find user by email
    const passenger = await register.findOne({ email });

    if (!passenger) {
      return res.status(404).json({
        success: false,
        message: "Passenger not found",
      });
    }

    // Check if password is correct
    const checkCorrectPassword = await bcrypt.compare(password, passenger.password);

    if (!checkCorrectPassword) {
      return res.status(401).json({
        success: false,
        message: "Incorrect email or password",
      });
    }

    // Create JWT token
    const token = jwt.sign(
      {
        id: passenger._id,
        role: passenger.role, // Assuming role is stored in the user document
      },
      process.env.JWT_SECRET,
      { expiresIn: "15d" }
    );

    // Set token in the browser cookie
    res.cookie("accessToken", token, {
      httpOnly: true,
      secure: true, // Enable for HTTPS
      expires: new Date(Date.now() + 15 * 24 * 60 * 60 * 1000), // 15 days
    });

    res.status(200).json({
      token: token,
      success: true,
      message: "Successfully logged in",
      data: { passenger: { ...passenger._doc, password: undefined }, role: passenger.role }, // Exclude password from response
    });
  } catch (error) {
    console.error("Error logging in:", error);
    res.status(500).json({
      success: false,
      message: "Failed to login. Please try again later.",
      error: error.message,
    });
  }
});






/*
// Route to login a Passenger 
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  const passenger = await register.findOne({ email: email });
  if (!passenger) {
    return res.status(400).json({ message: 'User is not registered' });
  }

  const validPassword = await bcrypt.compare(password, passenger.password);
  if (!validPassword) {
    return res.status(400).json({ message: 'Invalid password' });
  }

  const token = jwt.sign({ email: passenger.email }, process.env.KEY, { expiresIn: '1h' });
  res.cookie('token', token, { httpOnly: true, maxAge: 360000 });
  return res.json({ status: true, message: "Login successfully" });
});
 */


  // Function to send approval email
  async function sendApprovalEmail(email) {
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
        subject: 'Approval Email', // Subject line
        text: `Your account has been approved! . 
              your email is: ${email} 
              you can now log in and access your account`
      });
  
      console.log('Message sent: %s', info.messageId);
    } catch (error) {
      console.error('Error sending approval email:', error);
    }
  }
  
  

  

  // getTotal registered passengers
  router.route("/search/getTourCount").get(async (req, res) =>{

  try {
    const registerCount = await register.countDocuments({
      
    });
    res.status(200).json({
      success: true,

      data: registerCount,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "not found",
    });
  }
});




  // Get Male count
  router.route("/search/MaleCount").get(async (req, res) => {
    try {
        const MaleCount = await register.countDocuments({
          gender:"Male",
        });
        res.status(200).json({
            success: true,
            data: MaleCount,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "not found",
        });
    }
  });


  // Get Female count
  router.route("/search/FemaleCount").get(async (req, res) => {
    try {
        const FemaleCount = await register.countDocuments({
          gender:"Female",
        });
        res.status(200).json({
            success: true,
            data: FemaleCount,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "not found",
        });
    }
  });



module.exports = router;