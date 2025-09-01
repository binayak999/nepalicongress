const jwt = require('jsonwebtoken');



module.exports = function (req,res,next){
    const bearerHeader = req.header('ActiveMemberHeader');
    if(!bearerHeader) return res.status(401).send({"message":'Access Denied Verify Active'});
    try{
        //Split at the space
        const bearer = bearerHeader.split(' ');
        //Get token from array
        const bearerToken = bearer[1];
        const verified = jwt.verify(bearerToken,process.env.TOKEN_SECRET);
        req.user = verified;
        next();
    }catch(error){
        res.status(403).send('Invalid Token');
    }
}