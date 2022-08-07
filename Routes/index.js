//User - Signup / User - Login / User - Update / User - Delete
//Flight - Create || Flight - Delete
const express = require("express");
const router = express.Router();
const User = require("../Models/user");
const Flight = require("../Models/flights");
const authFile = require("../Services/auth");
var bcrypt = require("bcryptjs");
var salt = bcrypt.genSaltSync(10);

//ROUTES
//homepage
router.get("/home", function (req, res) {
    return res.send("Welcome");
});
//FOR USER MODEL
//user signup(register)
router.post("/signup", async (req, res) => {
    try 
    {
        var hash = bcrypt.hashSync(req.body.password, salt);

        await User.create({
            firstname: req.body.firstname,
            lastname: req.body.lastname,
            phoneno: req.body.phoneno,
            useremail: req.body.useremail,
            password: hash
        });
        return res.send("An User has been Created");
    }
    catch (error) 
    {
        console.log(error);
    }

});

//user login(authentication)
router.post("/login", async (req, res) => {
    try 
    {
        const user = await User.findOne({ useremail: req.body.useremail });
        if (!user) {
            return res.send("An User Not Found");
        }

        const check = bcrypt.compareSync(req.body.password, user.password);
        if (!check) {
            return res.send("The Password is Incorrect");
        }

        const token = authFile.genToken(user._id);
        // return res.send(token);
        return res.send({
            Message: "You have Successfully Logged In",
            token: token
        });
    }
    catch (error) 
    {
        console.log(error);
    }

});

//user update
router.post("/updateuser", async (req, res) => {
    try 
    {
        const id = req.body.id;
        const updateUser = await User.findByIdAndUpdate(
            id,
            {
                password: req.body.password
            },
            {
                new: true,
                runValidators: true
            });

        return res.send({
            Message: "User Info has been Updated",
            updatedInfo: updateUser
        });
    }
    catch (error) 
    {
        console.log(error);
    }
});

//user delete
router.post("/deleteuser", async (req, res) => {
    try 
    {
        const id = req.body.id;
        await User.findByIdAndDelete(id);
        return res.send("An User is Successfully Deleted");
    } 
    catch (error) 
    {
        console.log(error);
    }
});


//FOR FLIGHT MODEL
//create a new flight info 
router.post("/flight", async (req, res) => {
    try 
    {
        await Flight.create({
            airline: req.body.airline,
            flightName: req.body.flightName,
            flightNo: req.body.flightNo,
            destinationFrom: req.body.destinationFrom,
            destinationTo: req.body.destinationTo
        });
        return res.send("A New Flight Option has been Created");
    } 
    catch (error) 
    {
        console.log(error);    
    }
});

//delete an flight option
router.post("/deleteflight", async (req, res) => {
    try 
    {
        const id = req.body.id;
        await Flight.findByIdAndDelete(id);
        return res.send("The Flight Option is Successfully Deleted");
    } 
    catch (error) 
    {
        console.log(error);
    }
});

//find a flight by id
router.get("/findbyid", async (req, res) => {
    try 
    {
        const id = req.body.id;
        const flight = await Flight.findById(id);
        return res.send(flight);
    }
    catch (error) 
    {
        console.log(error);    
    }
});

//finding flight by params
router.get("/findbyid/:id", async (req, res) => {
    try 
    {
        const id = req.params.id;  //to assess params
        const flight = await Flight.findById(id);
        return res.send(flight);
    } 
    catch (error) 
    {
        console.log(error);
    }
});

//book a flight
router.post("/bookflight/:id", async (req, res) => {
    try 
    {
        const userid = req.body.id;
        const flightid = req.params.id;
    
        const updateUser = await User.findByIdAndUpdate(
            userid,
            {
                $push: { flightBooked: flightid }
                //$pull : {flightBooked: flightid}
            },
            {
                new: true,
                runValidators: true
            }
        );
    
        return res.send({
            Message: "Flight has been Booked Successfully",
            Update: updateUser
        });
    } 
    catch (error) 
    {
        console.log(error);    
    }
});

router.get("/allflights", authFile.authChecker, async (req, res) => {
    try 
    {
        const data = await Flight.find({});
        return res.send(data);
    } 
    catch (error) 
    {
        console.log(error);
        return res.send(error);
    }
});
module.exports = router;