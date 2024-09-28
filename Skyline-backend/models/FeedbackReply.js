const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const FeedbackReplySchema = new Schema({
    
    userId: {
        type: String,
      },
      feedbackId: {
        type: String,
      },email: {
        type: String,
       
       // required: true,
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
    },
    feedbackReply: {
        type: String,
        required: true
    }
  
});

const FeedbackReply = mongoose.model('FeedbackReply', FeedbackReplySchema);

module.exports = FeedbackReply;
