const express = require('express');
const router = express.Router();
let Feedback = require('../models/Feedback')

//add
router.post('/add', async (req, res) => {
    try {
        const {
            email,
            name,
            subject,
            message,
            
        } = req.body;

        const newFeedback = new Feedback({ 
            email,
            name,
            subject,
            message,
        });

        await newFeedback.save();
        res.json({ message: "Feedback Add Successful" }); 
    } catch (err) {
        console.error(err);
        res.status(500).send("Error Feedback Add");
    }
});



//Get all Feedback 

router.route("/").get((req, res) => {

    Feedback.find().then((feedback) => {
        res.json(feedback)
    }).catch((err) => {

          console.log(err);
          res.status(500).send('Error fetching Feedback: ' + err.message);
    })


})

//delete

router.route("/delete/:id").delete(async (req, res) => {
    let feedbackId = req.params.id;

    await Feedback.findByIdAndDelete(feedbackId)
    .then(() => {
        res.status(200).send({status:" Feedback Deleted" });
    }).catch(err => {
        console.error(err);
        res.status(500).send({status:" Error with delete Feedback",error: err.message});
    })
 

})  


//update feedback


router.route("/update/:id").put(async (req, res) => {
    let feedbackId = req.params.id;
    const{
        feedback,
       
 
    } = req.body;
 
    const updateFeedback = {
        feedback,
       
    }
    const update = await Feedback.findByIdAndUpdate(feedbackId,updateFeedback)
     .then(() => {
         res.status(200).send({status:" Feedback Updated" })
     }).catch(err => {
      console.error(err);
      res.status(500).send({status:" Error with Feedback",error: err.message});
     })
  
 
 
 })

// getTotal feedback
router.route("/search/getFeedbackCount").get(async (req, res) =>{

    try {
      const FeedbackCount = await Feedback.countDocuments({
        
      });
      res.status(200).json({
        success: true,
  
        data: FeedbackCount,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "not found",
      });
    }
  });


module.exports = router;