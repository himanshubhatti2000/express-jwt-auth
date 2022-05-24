const expressJwt = require('express-jwt');

//const REFRESH_TOKEN_PUBLIC_KEY=require(path.join(__dirname,'../keys/refreshToken/public.key.pub'));


const validateRefreshToken=(req,res,next)=>{
//   const result=expressJwt({
//     secret: REFRESH_TOKEN_PUBLIC_KEY
// });
// console.log(result);
res.status(200).json({});
}

module.exports=validateRefreshToken;