const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const TourSchema = new Schema({
    from: {
        type: String,
        required: true,
    },
    to: {
        type: String,
        required: true,
    },
    flight: {
        type: String, 
        required: true
    },
    departureDate: {
        type: String,
        required: true,
    },
    returnDate: {
        type: String,
        
    },
    tripType:{
        type: String,
        required: true
   },
   passengers:{
       type: String,
       required: true
   },
   economyPrice:{
       type: Number,
       required: true
   },
   businessPrice: {
        type: Number,
        required: true,
    },
    description: {
        type: String,
        required: true
    } ,
    photo: {
        type: String,
       required: true,
      }
    
  
});

const Tour = mongoose.model('Tour', TourSchema);

module.exports = Tour;
