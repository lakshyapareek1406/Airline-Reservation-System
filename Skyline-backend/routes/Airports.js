const express = require('express');
const router = express.Router();
let Airports = require('../models/Airport');


//add Airports
router.post('/add', async (req, res) => {
    try {
        const {
            airportName,
            airportLocation,
            airportCode,
            airportAddress
            
        } = req.body;

        const newAirport = new Airports({ // Corrected syntax
            airportName,
            airportLocation,
            airportCode,
            airportAddress
           
        });

        await newAirport.save();
        res.json({ message: "Airport Add Successful" }); // Response as JSON object
    } catch (err) {
        console.error(err);
        res.status(500).send("Error Airport Add");
    }
});

//Get all Flights

router.route("/").get((req, res) => {

    Airports.find().then((airport) => {
        res.json(airport)
    }).catch((err) => {

          console.log(err);
          res.status(500).send('Error fetching Airport: ' + err.message);
    })


})




//delete

router.route("/delete/:id").delete(async (req, res) => {
    let airportId = req.params.id;

    await Airports.findByIdAndDelete(airportId)
    .then(() => {
        res.status(200).send({status:" Airports Deleted" });
    }).catch(err => {
        console.error(err);
        res.status(500).send({status:" Error with delete Airports",error: err.message});
    })
 

})  


//update Airports


router.route("/update/:id").put(async (req, res) => {
    let AirportsId = req.params.id;
    const{
        airportName,
        airportLocation,
        airportCode,
        airportAddress
       
 
    } = req.body;
 
    const updateAirports = {
        airportName,
        airportLocation,
        airportCode,
        airportAddress
       
    }
    const update = await Airports.findByIdAndUpdate(AirportsId,updateAirports)
     .then(() => {
         res.status(200).send({status:" Airports Updated" })
     }).catch(err => {
      console.error(err);
      res.status(500).send({status:" Error with Airports Flight",error: err.message});
     })
  
 
 
 })




module.exports = router;