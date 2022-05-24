const jwt=require('jsonwebtoken');

const getJwtToken=(user,expireTime,RSA_PRIVATE_KEY)=>{
   const jwtBearerToken = jwt.sign({}, RSA_PRIVATE_KEY, {
           algorithm: 'RS256',
           expiresIn: expireTime,
           subject: user
       })
   
       return jwtBearerToken
}

module.exports=getJwtToken;