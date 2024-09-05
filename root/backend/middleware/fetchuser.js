const jwt = require('jsonwebtoken')
const JWT_SECRET = 'Shailisgoodb$oy';


const fetchuser = (req, res, next) => {
    
    //Get the user from the JWT token and add the id to req object
    const token = req.header('auth-token');
    if(!token){
        return res.status(401).send({error: "Please authenticate using a valid token"})
    }

    try{
        const data = jwt.verify(token, JWT_SECRET);
        req.user = data.user;
        next()
    } catch(error) {
        console.error("Token verification error:", error.message);
        return res.status(401).send({error: "Please authenticate using a valid token"})
    }
}


module.exports = fetchuser;