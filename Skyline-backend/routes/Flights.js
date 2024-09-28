const express = require('express');
const router = express.Router();
let Flight = require('../models/Flight');

//const Flight=require('../models/Flight');


router.post('/add', async (req, res) => {
    try {
        const {
            flightNumber,
            departure,
            arrival,
            timeOfDeparture,
            timeOfArrival,
            status ,
        } = req.body;

        const newFlight = new Flight({ 
            flightNumber,
            departure,
            arrival,
            timeOfDeparture,
            timeOfArrival,
            status ,
        });

        await newFlight.save();
        res.json({ message: "Flight Add Successful" }); // Response as JSON object
    } catch (err) {
        console.error(err);
        res.status(500).send("Error Flight Add");
    }
});



//Get all Flights

router.route("/").get((req, res) => {

    Flight.find().then((Flight) => {
        res.json(Flight)
    }).catch((err) => {

          console.log(err);
          res.status(500).send('Error fetching Flight: ' + err.message);
    })


})



//delete

router.route("/delete/:id").delete(async (req, res) => {
    let FlightId = req.params.id;

    await Flight.findByIdAndDelete(FlightId)
    .then(() => {
        res.status(200).send({status:" Flight Deleted" });
    }).catch(err => {
        console.error(err);
        res.status(500).send({status:" Error with delete Flight",error: err.message});
    })
 

})                  






//update Flight


router.route("/update/:id").put(async (req, res) => {
    let FlightId = req.params.id;
    const{
        flightNumber,
        departure,
        arrival,
        timeOfDeparture,
        timeOfArrival,
        status ,
        
 
    } = req.body;
 
    const updateFlight = {
        flightNumber,
        departure,
        arrival,
        timeOfDeparture,
        timeOfArrival,
        status ,
        
    }
    const update = await Flight.findByIdAndUpdate(FlightId,updateFlight)
     .then(() => {
         res.status(200).send({status:" Flight Updated" })
     }).catch(err => {
      console.error(err);
      res.status(500).send({status:" Error with updating Flight",error: err.message});
     })
  
 
 
 })
 

 // getTotal registered passengers
 router.route("/search/getFlightCount").get(async (req, res) =>{

    try {
      const FlightCount = await Flight.countDocuments({
        
      });
      res.status(200).json({
        success: true,
  
        data: FlightCount,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "not found",
      });
    }
  });



module.exports = router;