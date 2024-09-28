const mongoose = require('mongoose');

const Schema=mongoose.Schema;

const AirplaneSchema =new Schema({

    airplaneName: {
        type: String,
        required: true
    },
    regNumber: {
        type: String,
        required: true
    },
    description: {
        type: String, 
        required: true
    },
    economySeat : {
        type: Number,
        required: true,
    },
    busineessSeat: {
        type: Number,
        required: true,
    },
    totleSeat: {
        type: Number,
        required: true,
    },
})

const airplane = mongoose.model('airplane', AirplaneSchema);

module.exports = airplane;