const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const FeedbackSchema = new Schema({
    email: {
        type: String,
       
        //required: true,
    },
    name: {
        type: String,
        required: true
    },
    subject: {
        type: String,
        required: true
    },
    message: {
        type: String,
        required: true
    }
    
  
});

const Feedback = mongoose.model('Feedback', FeedbackSchema);

module.exports = Feedback;
