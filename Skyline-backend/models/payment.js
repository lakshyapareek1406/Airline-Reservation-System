const mongoose = require('mongoose');

const Schema = mongoose.Schema;


const paymentSchema = new Schema(
  {
    paymentId: {
      type: mongoose.Types.ObjectId,
      ref: "TourBooking",
    },
    amount: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);

const payment= mongoose.model("Payment", paymentSchema);

module.exports = payment;