const mongoose = require("mongoose");

const flightSchema =  new mongoose.Schema({
    airline : {
        type: String,
        required: true
    },
    flightName : {
        type: String,
        required: true
    },
    flightNo : {
        type: Number,
        required: true
    },
    destinationTo : {
        type: String,
        required: true
    },
    destinationFrom : {
        type: String,
        required: true
    }
},
{
    timestamps: true
});

const Flight = mongoose.model("Flight",flightSchema);
module.exports =  Flight;