const Users=require('../../models/users');
var ObjectId = require('mongodb').ObjectId; 

const getProfile=async (req, res, next)=> {
  const user=await Users.findOne({_id: ObjectId(req.auth.sub)})
  console.log(user);
  res.status(200).json({
      profile: user
  })
 }

 module.exports={getProfile};