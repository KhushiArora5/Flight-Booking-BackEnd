const mongoose = require("mongoose");

const userSchema =  new mongoose.Schema({
    firstname : {
        type: String,
        required: true
    },
    middlename : {
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
},
{
    timestamps: true
});

const User = mongoose.model("User",userSchema);
module.exports =  User;