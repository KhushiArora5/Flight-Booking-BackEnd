const mongoose = require("mongoose");

const dbConnect = async() =>{
    try
    {
        await mongoose.connect("mongodb://localhost:27017/Flight",
        {
        useUnifiedTopology: true,
        useNewUrlParser: true
        });
        console.log("MongoDB Connected");
    }
    catch(error)
    {
        console.log(`Error in Connecting to MongoDB ${error}`);
    }
};

module.exports = dbConnect;