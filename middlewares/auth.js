const expressJwt = require('express-jwt');
const fs=require('fs-js');
const RSA_PUBLIC_KEY = fs.readFileSync('./demos/public.key.pub');

const auth=(req, res, next)=>{
    expressJwt({
        secret: RSA_PUBLIC_KEY
    });
    next(); 
}


exports.module=auth;