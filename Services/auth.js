const jwt = require("jsonwebtoken");

const genToken = (id) =>{
    return jwt.sign({
        id:id,
    },
    'secret',
    {
        expiresIn: "35d"
    });
}

const authChecker = (req,res,next) =>{
    if(req.header.auth)
    {
        try
        {
            const token = req.header.auth;
            var decoded = jwt.verify(token,"secret");
            next();
        }
        catch(error)
        {
            return res.send("The User is not Authentic");
        }
    }
    else
    {
        return res.status(500).send("No Header Detected");
    }
}

module.exports = {genToken, authChecker};