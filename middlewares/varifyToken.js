const jwt = require("jsonwebtoken");

// checking token from frontend -----
module.exports.varifyToken = (req,res,next)=>{
    try{
      let token = req.headers.authorization?.split(" ")[1];
    // checking token------
      if(!token){
       return res.status(400).json({message:"token is not found ",success:false});

      }
    // varify token ---
     jwt.verify(token,process.env.JWT_SECRET,(err,decoded)=>{
      if(err){
        if(err.name ===  "TokenExpiredError"){
          return res.status(401).json({message:"Token Expired! Please Go To Login",success:false})
        } else {
          return res.status(401).json({ message: "Invalid token!",success:false });
        }
      }
       req.user = decoded;
       next();
     })
    

    }catch(err){
         res.status(500).json({message:"some error occur during varify token !",success:false})
    }
}