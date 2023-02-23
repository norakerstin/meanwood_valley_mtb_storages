//använder mongoose 
var mongoose = require('mongoose');

//skapar ett schema, schemat repersenterar vår databas strukur: 

var MtbSchema = new mongoose.Schema({
    name: String,
    brand: String,
    model: String,
    colour: String,
    fork: String,
    shock: String
},
//namnet på collection i db:
{
    collection: 'MTBs'
});

module.exports = mongoose.model('mtbmodule', MtbSchema);