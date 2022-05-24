const User=require('../../models/users');
const bcrypt = require('bcryptjs');

const signup=async(req, res)=> {
  const {email,password} = req.body;

const salt = bcrypt.genSaltSync(10);
const hashedPassword = bcrypt.hashSync(password, salt);
  const user=await User.findOne({email});
  if (!user) {
      User.create({email,password: hashedPassword},(err,user)=>{
        if(err){
         return next(err);
        }
        console.log('new user created',user);
        res.sendStatus(200);
      })
      }
  else {
      console.log('user conflict');
      res.sendStatus(409); 
  }
}

module.exports=signup;