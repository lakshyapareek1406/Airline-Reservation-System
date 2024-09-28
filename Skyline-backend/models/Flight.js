const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const FlightSchema = new Schema({
    flightNumber: {
        type: String,
        required: true
    },
    departure: {
        type: String,
        required: true
    },
    arrival: {
        type: String, 
        required: true
    },
    timeOfDeparture: {
        type: String,
        required: true,
    },
    timeOfArrival: {
        type: String,
        required: true,
    },
    status :{
       type: String,
       required: true,
       
    },
   
  
});

const flight = mongoose.model('Flight', FlightSchema);

module.exports = flight;
