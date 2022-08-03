const mongoose = require("mongoose");

const userSchema =  new mongoose.Schema({
    firstname : {
        type: String,
        required: true
    },
    lastname : {
        type: String,
        required: true
    },
    phoneno : {
        type: Number,
        required: true
    },
    useremail : {
        type: String,
        required: true
    },
    password : {
        type: String,
        required: true
    },
    flightBooked : [{
        // type : mongoose.Schema.Types.ObjectId
        type: String
    }]
},
{
    timestamps: true
});

const User = mongoose.model("User",userSchema);
module.exports =  User;