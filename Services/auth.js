const jwt = require("jsonwebtoken");

const genToken = (id) =>{
    return jwt.sign({
        id:id,
    },
    'secret',
    {
        expiresIn: "185d"
    });
}

const authChecker = (req,res,next) =>{
    if(req.headers.auth)
    {
        try
        {
            const token = req.headers.auth;
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