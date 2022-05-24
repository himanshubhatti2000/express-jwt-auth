const validateUser=require('../../services/validateUser');
const getTokens=require('../../services/tokens');

const fs = require('fs');
const path = require('path');

const ACCESS_TOKEN_RSA_PRIVATE_KEY=fs.readFileSync(path.join(__dirname,'../../keys/accessToken/private.key'));
const REFRESH_TOKEN_RSA_PRIVATE_KEY =fs.readFileSync(path.join(__dirname,'../../keys/refreshToken/private.key'));

const login=async (req, res,next)=> {
  const {email,password} = req.body;
  const user=await validateUser(email,password,next);
  
  if (!user) {
    res.sendStatus(401);
      }
  else {
       const userId = user._id.toString();
    res.status(200).json(getTokens(userId)); 
  }
}

module.exports=login;