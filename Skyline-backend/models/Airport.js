const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const AirportSchema = new Schema({
    airportName: {
        type: String,
        required: true
    },
    airportLocation: {
        type: String,
        required: true
    },
    airportCode: {
        type: String,
        required: true
    },
    airportAddress: {
        type: String,
        required: true
    },
 
  
});

const Airport = mongoose.model('Airport', AirportSchema);

module.exports = Airport;
