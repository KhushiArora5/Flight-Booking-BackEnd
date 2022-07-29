const mongoose = require("mongoose");

const dbConnect = async() =>{
    try
    {
        await mongoose.connect("mongodb+srv://Khushi05:If1kexyvXRqVS8wO@cluster0.utx46.mongodb.net/Flight?retryWrites=true&w=majority",
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