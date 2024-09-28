const express = require('express');
const router = express.Router();
let Airplane = require('../models/Airplane');



//add Airplane
router.post('/add', async (req, res) => {
    try {
        const {
            airplaneName,
            regNumber,
            description,
            economySeat,
            busineessSeat,
            totleSeat,
            
        } = req.body;

        const newAirplane = new Airplane({ 
            airplaneName,
            regNumber,
            description,
            economySeat,
            busineessSeat,
            totleSeat,
           
        });

        await newAirplane.save();
        res.json({ message: "Airplane Add Successful" }); // Response as JSON object
    } catch (err) {
        console.error(err);
        res.status(500).send("Error Airplane Add");
    }
});





//Get all Flights

router.route("/").get((req, res) => {

    Airplane.find().then((Flight) => {
        res.json(Flight)
    }).catch((err) => {

          console.log(err);
          res.status(500).send('Error fetching Airplane: ' + err.message);
    })


})



//delete

router.route("/delete/:id").delete(async (req, res) => {
    let AirplaneId = req.params.id;

    await Airplane.findByIdAndDelete(AirplaneId)
    .then(() => {
        res.status(200).send({status:" Airplane Deleted" });
    }).catch(err => {
        console.error(err);
        res.status(500).send({status:" Error with delete Airplane",error: err.message});
    })
 

})                  




//update Flight


router.route("/update/:id").put(async (req, res) => {
    let AirplaneId = req.params.id;
    const{
        airplaneName,
            regNumber,
            description,
            economySeat,
            busineessSeat,
 
    } = req.body;
 
    const updateAirplane = {
        airplaneName,
        regNumber,
        description,
        economySeat,
        busineessSeat,
    }
    const update = await Airplane.findByIdAndUpdate(AirplaneId,updateAirplane)
     .then(() => {
         res.status(200).send({status:" Airplane Updated" })
     }).catch(err => {
      console.error(err);
      res.status(500).send({status:" Error with updating Airplane",error: err.message});
     })
  
 
 
 })






module.exports = router;