const User=require('../models/users');
const bcrypt = require('bcryptjs');

const validateUser=async(email,password,next)=>{
  try{
    console.log('credentials',email,password);
    const user=await User.findOne({email}).populate('password');
    if(bcrypt.compareSync(password, user.password)){
    return user;
     }
     console.log('wrong password')
  }
  catch(err){
    console.log('error',err)
  }
}

module.exports=validateUser