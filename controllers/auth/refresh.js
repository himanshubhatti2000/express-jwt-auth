const jwt=require('jsonwebtoken');
const getTokens=require('../../services/tokens');
const Users=require('../../models/users');
const ObjectId=require('mongodb').ObjectId;

const fs = require('fs');
const path = require('path');
const { userInfo } = require('os');
const users = require('../../models/users');

const REFRESH_TOKEN_RSA_PUBLIC_KEY =fs.readFileSync(path.join(__dirname,'../../keys/refreshToken/public.key.pub'));

const refresh=(req,res,next)=>{
  //validateRefreshToken(refreshToken);
  const token=req.headers.refresh.split(' ')[1];
  jwt.verify(token, REFRESH_TOKEN_RSA_PUBLIC_KEY, function(err, decoded) {
    if(err){
      console.log(err);
      return res.status(403).json({});
    }
    console.log('jwt verified')
    users.findOne({_id: ObjectId(decoded.sub),refreshTokens: token},(err,user)=>{
      if(err){
        console.log(err)
      }
      else{
        console.log(user);
        if(user){
          console.log(user,'exists in db')
          return res.status(403).json({})
        }
        console.log('not exist in db')
          console.log(decoded.sub, token)
          Users.updateOne(
           { _id: ObjectId(decoded.sub)},
           { $push: {refreshTokens: token } },
           (err,success)=>{
             if(err){
               return res.status(403).json({})
             }
             return res.status(200).json(getTokens(decoded.sub))
           }
         )
      }
    });
    //console.log(decoded) // bar
  });
 // const token='fdfdf';
  // jwt.verify(token, REFRESH_TOKEN_RSA_PUBLIC_KEY, function(err, decoded) {
  //   if(err){
  //     console.log('refresh token validation',err);
  //     res.status(401).json({});
  //   }
  //   res.status(200).json({});
  // });
 
}

module.exports=refresh;

