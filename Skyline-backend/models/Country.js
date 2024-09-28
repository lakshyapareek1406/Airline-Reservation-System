const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const CountrySchema = new Schema({
    Country: {
        type: String,
        required: true
    },
    
 
  
});

const Country = mongoose.model('Country', CountrySchema);

module.exports = Country;
