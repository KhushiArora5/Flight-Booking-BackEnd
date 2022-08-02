const express = require("express");
const logger = require("morgan");
const app = express();
const PORT = 4000;
const cors = require("cors");
const dbConfig = require("./Services/dbConfig");
const router = require("./Routes/index"); // to add more routes same process as it

app.use(logger("dev"));
app.use(express.json({ limit: "50mb"}));
app.use(express.urlencoded({ limit: "50mb", extended:false }));
app.use("/api", router);
dbConfig();

app.listen(PORT, function(error){
    if(error)
    {
        console.log("Error in starting the server");
    }

    console.log(`Server started successfully on port : ${PORT}`);
});