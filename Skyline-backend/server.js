const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const dotenv = require('dotenv');
const app = express();
const cookieParser = require('cookie-parser');

require("dotenv").config();

const PORT = process.env.PORT || 5000;



//middleware
app.use(express.json({limit: '25mb'}));
app.use(express.urlencoded({limit: '25mb'}));
app.use(cors());
app.use(bodyParser.json());
app.use(cookieParser());

const URL = process.env.MONGODB_URL;

mongoose.connect(URL, {
    dbname:"Skyline",
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

const connection = mongoose.connection;
connection.once('open', () => {
    console.log(":🚀 MongoDB Connection Successfully  ");
});




// Access Registration routes
const registerRoutes = require('./routes/passenger.js');
app.use('/register', registerRoutes);

// Access Flights routes
const flightlistRoutes =require('./routes/Flights.js');
app.use('/flightlist',flightlistRoutes);

//Access Books routes
const booklistRoutes = require('./routes/TourBooks.js');
app.use('/tourbooks', booklistRoutes);

//access Countries routes
const countriesRoutes = require('./routes/Countries.js');
app.use('/countries', countriesRoutes);

//Access Airport routes
const AirportRoutes = require('./routes/Airports.js');
app.use('/airport',AirportRoutes);

//Access Feedback routes
const FeedbackRoutes = require('./routes/Feedbacks.js');
app.use('/feedback',FeedbackRoutes);

//Access Airplane routes
const AirplaneRoutes = require('./routes/Airplanes.js');
app.use('/airplane',AirplaneRoutes);


//Access Tour routes
const TourRoutes = require('./routes/Tours.js');
app.use('/tour',TourRoutes);


//Access Feedback routes
const FeedbackReplyRoutes = require('./routes/FeedbackReplys.js');
app.use('/feedbackReply', FeedbackReplyRoutes);

/*
//Access Payment routes
const PaymentReplyRoutes = require('./routes/Payments.js');
app.use('/payments', PaymentReplyRoutes);*/

// Middleware function to handle 404 errors
app.use((req, res, next) => {
    const error = new Error('Not Found');
    error.status = 404;
    next(error);
});

// Error handling middleware
app.use((err, req, res, next) => {
    res.status(err.status || 500);
    res.json({
        error: {
            message: err.message
        }
    });
});



app.listen(PORT, () => {
    console.log(` 🚀 Server is up and running on port: ${PORT}`);
});
