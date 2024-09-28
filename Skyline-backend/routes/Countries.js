const express = require('express');
const router = express.Router();
let countrys = require('../models/Country');




//add country
router.post('/add', async (req, res) => {
    try {
        const {
            Country,
            
        } = req.body;

        const newCountry = new countrys({ // Corrected syntax
            Country,
           
        });

        await newCountry.save();
        res.json({ message: "Country Add Successful" }); // Response as JSON object
    } catch (err) {
        console.error(err);
        res.status(500).send("Error Country Add");
    }
});

//Get all Flights

router.route("/").get((req, res) => {

    countrys.find().then((Country) => {
        res.json(Country)
    }).catch((err) => {

          console.log(err);
          res.status(500).send('Error fetching Country: ' + err.message);
    })


})




//delete

router.route("/delete/:id").delete(async (req, res) => {
    let CountryId = req.params.id;

    await countrys.findByIdAndDelete(CountryId)
    .then(() => {
        res.status(200).send({status:" Country Deleted" });
    }).catch(err => {
        console.error(err);
        res.status(500).send({status:" Error with delete Country",error: err.message});
    })
 

})   


//update Country


router.route("/update/:id").put(async (req, res) => {
    let CountryId = req.params.id;
    const{
        Country,
       
 
    } = req.body;
 
    const updateCountry = {
        Country,
       
    }
    const update = await countrys.findByIdAndUpdate(CountryId,updateCountry)
     .then(() => {
         res.status(200).send({status:" Country Updated" })
     }).catch(err => {
      console.error(err);
      res.status(500).send({status:" Error  Add Flight",error: err.message});
     })
  
 
 
 })
 

module.exports = router;