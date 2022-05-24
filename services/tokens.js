const jwt=require('jsonwebtoken');
const fs = require('fs');
const path = require('path');
const Users = require('../models/users');
var ObjectId = require('mongodb').ObjectId; 

const ACCESS_TOKEN_RSA_PRIVATE_KEY=fs.readFileSync(path.join(__dirname,'../keys/accessToken/private.key'));
const REFRESH_TOKEN_RSA_PRIVATE_KEY =fs.readFileSync(path.join(__dirname,'../keys/refreshToken/private.key'));

const getJwtToken=(user,expireTime,RSA_PRIVATE_KEY)=>{
  const jwtBearerToken = jwt.sign({}, RSA_PRIVATE_KEY, {
          algorithm: 'RS256',
          expiresIn: expireTime,
          subject: user
      })
  
      return jwtBearerToken
}


getTokens=(userId)=>{
  const expireTime=5;
  const refreshTokenExpireIn=12000;
  const jwtBearerToken= getJwtToken(userId,expireTime,ACCESS_TOKEN_RSA_PRIVATE_KEY); 
  const refreshToken=getJwtToken(userId,refreshTokenExpireIn,REFRESH_TOKEN_RSA_PRIVATE_KEY);

  //storing refreshToken in db
    return {
      idToken: jwtBearerToken,
      refreshToken,
      expiresIn: expireTime,
      refreshTokenExpireIn
    }
   
   

  
}

module.exports=getTokens