const express = require('express');
const router = express.Router();

const TourBooking = require("../models/TourBooking.js");
const Payment = require("../models/payment.js");

// Create a payment
router.post('/:tourId', async (req, res) => {
  const tourId = req.params.tourId;
  const newPayment = new Payment({ ...req.body });

  try {
    const savedPayment = await newPayment.save();

    await TourBooking.findByIdAndUpdate(tourId, {
      $push: { payments: savedPayment._id },
    });

    res.status(200).json({
      success: true,
      message: "Payment submitted",
      data: savedPayment,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Payment not submitted",
    });
  }
});

module.exports = router;
